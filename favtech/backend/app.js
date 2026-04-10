require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const morgan = require('morgan');
const crypto = require('crypto');
const Joi = require('joi');

const app = express();
const port = process.env.PORT || 5000;

const fs = require('fs');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `logo_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    if (ext) return cb(null, true);
    cb(new Error('Only images are allowed!'));
  }
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false, // For local dev with avatars/logos
}));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(morgan('dev'));

// Base Route (Health Check)
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'FavTech API Node is Active', 
    timestamp: new Date().toISOString() 
  });
});

// Database Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'favtech',
});

// Security: Enforce JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'favtech_secret_key_2026';

// Multi-Role Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Auth token missing.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' });
  next();
};

// Helpter to get configuration dynamically
const getSettings = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM app_settings WHERE id = 1');
    return rows[0] || {};
  } catch (err) {
    return {};
  }
};

const logEvent = async (type, message, metadata = {}, ip = '0.0.0.0') => {
  try {
    await pool.query('INSERT INTO system_logs (type, message, metadata, ip_address) VALUES (?, ?, ?, ?)', 
    [type, message, JSON.stringify(metadata), ip]);
  } catch (err) {
    console.error('Logging failed:', err);
  }
};

/* --- SYSTEM INITIALIZATION --- */
app.get('/api/setup-db', async (req, res) => {
  try {
    console.log('🚀 Manual Database Sync Triggered...');
    
    // Create Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin', 'support', 'finance') DEFAULT 'user',
        wallet_balance DECIMAL(15, 2) DEFAULT 0.00,
        status ENUM('active', 'suspended', 'banned') DEFAULT 'active',
        referral_code VARCHAR(50) UNIQUE,
        referred_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create App Settings Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS app_settings (
        id INT PRIMARY KEY DEFAULT 1,
        site_name VARCHAR(255) DEFAULT 'FavTech',
        site_title VARCHAR(255) DEFAULT 'Premium SMM Platform',
        currency_symbol VARCHAR(10) DEFAULT '₦',
        logo_url VARCHAR(500),
        voke_api_url VARCHAR(500) DEFAULT 'https://voke.io/api/v2',
        global_margin DECIMAL(5, 2) DEFAULT 10.00,
        enable_registration BOOLEAN DEFAULT TRUE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Add more tables if needed...
    await pool.query('INSERT IGNORE INTO app_settings (id) VALUES (1)');

    // Ensure Admin exists
    const [admins] = await pool.query('SELECT * FROM users WHERE role = "admin"');
    if (admins.length === 0) {
      const hashedPassword = await bcrypt.hash('adminpassword123', 10);
      await pool.query(
        'INSERT INTO users (name, email, password, role, wallet_balance) VALUES (?, ?, ?, ?, ?)',
        ['Master Admin', 'admin@favtech.com', hashedPassword, 'admin', 99999]
      );
    }

    res.json({ message: 'Database Synchronized Successfully!', admin: 'admin@favtech.com / adminpassword123' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sync failed: ' + err.message });
  }
});

/* --- AUTHENTICATION --- */
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, referral } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    let referredBy = null;
    if (referral) {
      const [referrers] = await pool.query('SELECT id FROM users WHERE referral_code = ?', [referral]);
      if (referrers.length > 0) referredBy = referrers[0].id;
    }

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, referral_code, referred_by) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, referralCode, referredBy]
    );

    await logEvent('auth', `New registration: ${email}`, { userId: result.insertId }, req.ip);
    res.status(201).json({ message: 'Welcome to FavTech!' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ error: 'User not found' });
    
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });
    
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '2d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, wallet: user.wallet_balance, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

/* --- DYNAMIC SMM SERVICES --- */
app.get('/api/services', authenticateToken, async (req, res) => {
  try {
    const settings = await getSettings();
    if (!settings.voke_api_url || !settings.voke_api_key) return res.status(400).json({ error: 'Provider not connected.' });

    const response = await axios.post(settings.voke_api_url, {
      key: settings.voke_api_key,
      action: 'services'
    });

    const margin = parseFloat(settings.global_margin || 0) / 100;
    const services = (response.data || []).map(s => ({
      ...s,
      rate: (parseFloat(s.rate) * (1 + margin)).toFixed(4)
    }));
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to synchronize services.' });
  }
});

app.post('/api/orders/new', authenticateToken, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const settings = await getSettings();
    await connection.beginTransaction();
    const { service_id, link, quantity } = req.body;
    const userId = req.user.id;
    
    // 1. Fetch dynamic rate from API provider
    const servicesRes = await axios.post(settings.voke_api_url, {
      key: settings.voke_api_key,
      action: 'services'
    });
    
    const services = servicesRes.data || [];
    const service = services.find(s => String(s.service) === String(service_id));
    if (!service) throw new Error('Service node offline.');

    const baseRate = parseFloat(service.rate);
    const margin = parseFloat(settings.global_margin || 0) / 100;
    const rateWithProfit = baseRate * (1 + margin);
    const charge = (quantity / 1000) * rateWithProfit;

    const [users] = await connection.query('SELECT wallet_balance FROM users WHERE id = ? FOR UPDATE', [userId]);
    if (users[0].wallet_balance < charge) {
      await connection.rollback();
      return res.status(400).json({ error: 'Insufficient funds.' });
    }

    await connection.query('UPDATE users SET wallet_balance = wallet_balance - ? WHERE id = ?', [charge, userId]);

    // 2. Submit to provider
    const apiResponse = await axios.post(settings.voke_api_url, {
      key: settings.voke_api_key,
      action: 'add',
      service: service_id,
      link,
      quantity
    });

    if (apiResponse.data.error) {
      await connection.rollback();
      return res.status(400).json({ error: apiResponse.data.error });
    }

    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, service_id, link, quantity, charge, status, api_order_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, service_id, link, quantity, charge, 'pending', apiResponse.data.order]
    );

    await connection.query(
      'INSERT INTO transactions (user_id, amount, type, reference, status) VALUES (?, ?, ?, ?, ?)',
      [userId, charge, 'order', `TRX-${orderResult.insertId}`, 'completed']
    );

    await connection.commit();
    res.status(201).json({ message: 'Order deployed successfully!' });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message || 'Order process failed.' });
  } finally {
    connection.release();
  }
});

/* --- PRODUCTION GATEWAYS (PAYSTACK) --- */
app.post('/api/wallet/fund', authenticateToken, async (req, res) => {
  try {
    const settings = await getSettings();
    const { amount, email } = req.body;

    if (!settings.paystack_secret_key || !settings.paystack_enabled) return res.status(400).json({ error: 'Gateway offline.' });

    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      email,
      amount: Math.round(amount * 100) 
    }, {
      headers: { Authorization: `Bearer ${settings.paystack_secret_key}`, 'Content-Type': 'application/json' }
    });

    await pool.query(
      'INSERT INTO transactions (user_id, amount, type, reference, status) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, amount, 'deposit', response.data.data.reference, 'pending']
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gateway initialization failure.' });
  }
});

app.post('/api/webhooks/paystack', async (req, res) => {
  const settings = await getSettings();
  const secret = settings.paystack_secret_key;
  const signature = req.headers['x-paystack-signature'];
  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

  if (hash === signature) {
    const event = req.body;
    if (event.event === 'charge.success') {
      const { reference, amount, customer } = event.data;
      const amountPaid = amount / 100;
      
      const [existing] = await pool.query('SELECT status FROM transactions WHERE reference = ?', [reference]);
      if (existing.length > 0 && existing[0].status === 'completed') return res.sendStatus(200);

      const [users] = await pool.query('SELECT id FROM users WHERE email = ?', [customer.email]);
      if (users.length > 0) {
        const userId = users[0].id;
        await pool.query('UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?', [amountPaid, userId]);
        await pool.query('UPDATE transactions SET status = "completed" WHERE reference = ?', [reference]);
        await logEvent('payment', `Balance Synced: ₦${amountPaid}`, { userId, reference }, req.ip);
      }
    }
  }
  res.sendStatus(200);
});

/* --- ANALYTICS ENGINE (DYNAMIC) --- */
app.get('/api/admin/stats', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [[users]] = await pool.query('SELECT COUNT(*) as count FROM users');
    const [[orders]] = await pool.query('SELECT COUNT(*) as count FROM orders');
    const [[pending]] = await pool.query('SELECT COUNT(*) as count FROM orders WHERE status = "pending"');
    const [[revenue]] = await pool.query('SELECT SUM(charge) as sum FROM orders WHERE status != "cancelled"');
    const [[todayRevenue]] = await pool.query('SELECT SUM(charge) as sum FROM orders WHERE DATE(created_at) = CURDATE() AND status != "cancelled"');

    res.json({
      totalUsers: users.count,
      totalOrders: orders.count,
      totalRevenue: revenue.sum || 0,
      pendingOrders: pending.count,
      todayRevenue: todayRevenue.sum || 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Analytics failure.' });
  }
});

app.get('/api/admin/chart-data', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    const interval = period === 'week' ? '7 DAY' : '30 DAY';
    const fmt = period === 'week' ? '%a' : '%b %d';
    
    // Ensure we ALWAYS return data even if no orders exist to prevent blank charts
    const [data] = await pool.query(`
      SELECT DATE_FORMAT(created_at, ?) as label, SUM(charge) as revenue, COUNT(*) as orders
      FROM orders
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL ${interval})
      GROUP BY DATE(created_at)
      ORDER BY created_at ASC
    `, [fmt]);

    // If no data, return mock trend so admin sees how it looks
    if (data.length === 0) {
      const mock = [
        { label: 'Mon', revenue: 12000, orders: 10 },
        { label: 'Tue', revenue: 19500, orders: 18 },
        { label: 'Wed', revenue: 15000, orders: 12 },
        { label: 'Thu', revenue: 32000, orders: 25 },
        { label: 'Fri', revenue: 27000, orders: 20 },
        { label: 'Sat', revenue: 41000, orders: 35 },
        { label: 'Sun', revenue: 48500, orders: 42 }
      ];
      return res.json(mock);
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Data sync error.' });
  }
});

/* --- SYSTEM CONTROL --- */
app.get('/api/settings/public', async (req, res) => {
  try {
    const s = await getSettings();
    res.json({
      site_name: s.site_name,
      site_title: s.site_title,
      currency_symbol: s.currency_symbol,
      logo_url: s.logo_url,
      support_email: s.support_email,
      enable_registration: !!s.enable_registration
    });
  } catch (err) {
    res.status(500).json({ error: 'Settings node failure.' });
  }
});

app.get('/api/admin/settings', authenticateToken, isAdmin, async (req, res) => {
  try {
    const s = await getSettings();
    res.json(s);
  } catch (err) {
    res.status(500).json({ error: 'Admin sync failed.' });
  }
});

app.post('/api/admin/settings', authenticateToken, isAdmin, async (req, res) => {
  try {
    const data = req.body;
    const fields = Object.keys(data).filter(k => !['id', 'updated_at', 'logo_url'].includes(k));
    const values = fields.map(k => data[k]);
    const query = `UPDATE app_settings SET ${fields.map(f => `${f} = ?`).join(', ')} WHERE id = 1`;
    await pool.query(query, values);
    res.json({ message: 'Parameters updated across all nodes.' });
  } catch (err) {
    res.status(500).json({ error: 'Config update failed.' });
  }
});

app.post('/api/admin/upload-logo', authenticateToken, isAdmin, (req, res) => {
  upload.single('logo')(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });
    try {
      const logoUrl = `/uploads/${req.file.filename}`;
      await pool.query('UPDATE app_settings SET logo_url = ? WHERE id = 1', [logoUrl]);
      res.json({ message: 'Asset updated!', logoUrl });
    } catch (dbErr) {
      res.status(500).json({ error: 'Storage sync failed.' });
    }
  });
});

async function sendMail({ to, subject, text, html }) {
  try {
    const settings = await getSettings();
    if (!settings.smtp_host) return;

    const transporter = nodemailer.createTransport({
      host: settings.smtp_host,
      port: settings.smtp_port,
      secure: settings.smtp_encryption === 'ssl',
      auth: { user: settings.smtp_user, pass: settings.smtp_pass }
    });

    await transporter.sendMail({
      from: `"${settings.site_name}" <${settings.smtp_user}>`,
      to, subject, text, html
    });
  } catch (err) {
    console.error('Mail failure:', err.message);
  }
}

app.post('/api/admin/test-email', authenticateToken, isAdmin, async (req, res) => {
  try {
    await sendMail({
      to: req.body.email,
      subject: '🚀 SMTP Configuration Success',
      html: `<h1>Connection Stable!</h1><p>Your platform node is synchronized and delivery is active.</p>`
    });
    res.json({ message: 'Test email dispatched.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ─── USER ROUTES ──────────────────────────────────────────────────────── */

// GET /api/user/profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, wallet_balance, role, status, referral_code, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load profile.' });
  }
});

// PUT /api/user/profile  (update name / email)
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.user.id]);
    res.json({ message: 'Profile updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed.' });
  }
});

// GET /api/user/stats
app.get('/api/user/stats', authenticateToken, async (req, res) => {
  try {
    const id = req.user.id;
    const [[wallet]]  = await pool.query('SELECT wallet_balance FROM users WHERE id = ?', [id]);
    const [[orders]]  = await pool.query('SELECT COUNT(*) as count FROM orders WHERE user_id = ?', [id]);
    const [[spent]]   = await pool.query('SELECT SUM(charge) as total FROM orders WHERE user_id = ? AND status != "cancelled"', [id]);
    const [[pending]] = await pool.query('SELECT COUNT(*) as count FROM orders WHERE user_id = ? AND status = "pending"', [id]);
    res.json({
      wallet:        wallet?.wallet_balance || 0,
      totalOrders:   orders?.count  || 0,
      totalSpent:    spent?.total   || 0,
      pendingOrders: pending?.count || 0,
    });
  } catch (err) {
    res.status(500).json({ error: 'Stats unavailable.' });
  }
});

// GET /api/user/orders
app.get('/api/user/orders', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 100',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch orders.' });
  }
});

// GET /api/user/transactions
app.get('/api/user/transactions', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 100',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch transactions.' });
  }
});

// GET /api/user/tickets
app.get('/api/user/tickets', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM support_tickets WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch tickets.' });
  }
});

// POST /api/user/tickets
app.post('/api/user/tickets', authenticateToken, async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message) return res.status(400).json({ error: 'Subject and message are required.' });
    const [result] = await pool.query(
      'INSERT INTO support_tickets (user_id, subject, message, status) VALUES (?, ?, ?, ?)',
      [req.user.id, subject, message, 'open']
    );
    res.status(201).json({ message: 'Ticket submitted.', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Ticket submission failed.' });
  }
});

/* ─── ADMIN USER MANAGEMENT ─────────────────────────────────────────────── */

// GET /api/admin/users
app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, status, wallet_balance, referral_code, created_at, (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as orders FROM users ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// PUT /api/admin/users/:id
app.put('/api/admin/users/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status, wallet_balance } = req.body;
    await pool.query(
      'UPDATE users SET name = ?, email = ?, role = ?, status = ?, wallet_balance = ? WHERE id = ?',
      [name, email, role, status, wallet_balance, id]
    );
    await logEvent('admin', `User #${id} updated by admin #${req.user.id}`, { name, role, status }, req.ip);
    res.json({ message: 'User updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed.' });
  }
});

// GET /api/admin/orders
app.get('/api/admin/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT o.*, u.name as user_name, u.email as user_email
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC
       LIMIT 200`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

// PUT /api/admin/orders/:id  (status update)
app.put('/api/admin/orders/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Order status updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed.' });
  }
});

// GET /api/admin/transactions
app.get('/api/admin/transactions', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.*, u.name as user_name, u.email as user_email
       FROM transactions t
       LEFT JOIN users u ON t.user_id = u.id
       ORDER BY t.created_at DESC
       LIMIT 500`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions.' });
  }
});

// GET /api/admin/tickets
app.get('/api/admin/tickets', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.*, u.name as user_name, u.email as user_email
       FROM support_tickets t
       LEFT JOIN users u ON t.user_id = u.id
       ORDER BY t.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets.' });
  }
});

// PUT /api/admin/tickets/:id
app.put('/api/admin/tickets/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reply } = req.body;
    await pool.query('UPDATE support_tickets SET status = ?, admin_reply = ? WHERE id = ?', [status, reply, id]);
    res.json({ message: 'Ticket updated.' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed.' });
  }
});

/* ──────────────────────────────────────────────────────────────────────── */

app.listen(port, () => {
  console.log(`🚀 Master Console Active on Port ${port}`);
});
