const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function initializeDatabase() {
    console.log('🚀 Starting FavTech Database Initialization...');
    
    // Connect without database selected
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
    });

    try {
        // Create Database
        await connection.query('CREATE DATABASE IF NOT EXISTS favtech');
        await connection.query('USE favtech');
        console.log('✅ Database "favtech" ready.');

        // Create Users Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin', 'support', 'finance') DEFAULT 'user',
                wallet_balance DECIMAL(15, 2) DEFAULT 0.00,
                status ENUM('active', 'suspended', 'banned') DEFAULT 'active',
                two_factor_enabled BOOLEAN DEFAULT FALSE,
                two_factor_secret VARCHAR(255),
                referral_code VARCHAR(50) UNIQUE,
                referred_by INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Users table ready.');

        // Create Orders Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                service_id INT NOT NULL,
                link VARCHAR(500) NOT NULL,
                quantity INT NOT NULL,
                charge DECIMAL(15, 4) NOT NULL,
                status ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
                api_order_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);
        console.log('✅ Orders table ready.');

        // Create Transactions Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS transactions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                amount DECIMAL(15, 2) NOT NULL,
                type ENUM('deposit', 'withdrawal', 'order', 'refund', 'referral') NOT NULL,
                reference VARCHAR(255) UNIQUE,
                status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);
        console.log('✅ Transactions table ready.');

        // Create App Settings Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS app_settings (
                id INT PRIMARY KEY DEFAULT 1,
                site_name VARCHAR(255) DEFAULT 'FavTech',
                site_title VARCHAR(255) DEFAULT 'Premium SMM Platform',
                currency_symbol VARCHAR(10) DEFAULT '₦',
                currency_code VARCHAR(10) DEFAULT 'NGN',
                logo_url VARCHAR(500),
                support_email VARCHAR(255) DEFAULT 'support@favtech.com',
                whatsapp_number VARCHAR(20),
                smtp_host VARCHAR(255),
                smtp_port INT,
                smtp_user VARCHAR(255),
                smtp_pass VARCHAR(255),
                smtp_encryption ENUM('ssl', 'tls', 'none') DEFAULT 'tls',
                google_client_id VARCHAR(500),
                google_client_secret VARCHAR(500),
                paystack_public_key VARCHAR(500),
                paystack_secret_key VARCHAR(500),
                paystack_enabled BOOLEAN DEFAULT TRUE,
                enable_registration BOOLEAN DEFAULT TRUE,
                enable_2fa BOOLEAN DEFAULT FALSE,
                referral_commission DECIMAL(5, 2) DEFAULT 5.00,
                minimum_deposit DECIMAL(15, 2) DEFAULT 100.00,
                maintenance_mode BOOLEAN DEFAULT FALSE,
                site_domain VARCHAR(255) DEFAULT 'favtech.com',
                voke_api_key VARCHAR(500),
                voke_api_url VARCHAR(500) DEFAULT 'https://voke.io/api/v2',
                global_margin DECIMAL(5, 2) DEFAULT 10.00,
                social_links JSON,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ App Settings table ready.');

        // Create Support Tickets Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS support_tickets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                admin_reply TEXT,
                status ENUM('open', 'in_progress', 'closed') DEFAULT 'open',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);
        console.log('✅ Support Tickets table ready.');

        // Create System Logs Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS system_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                type VARCHAR(50) NOT NULL,
                message TEXT NOT NULL,
                metadata JSON,
                ip_address VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ System Logs table ready.');


        // Initialize default settings if not exists
        const [settings] = await connection.query('SELECT * FROM app_settings WHERE id = 1');
        if (settings.length === 0) {
            await connection.query('INSERT INTO app_settings (id) VALUES (1)');
            console.log('✅ Default settings initialized.');
        }

        // Check if admin exists
        const [admins] = await connection.query('SELECT * FROM users WHERE role = "admin"');
        if (admins.length === 0) {
            const hashedPassword = await bcrypt.hash('adminpassword123', 10);
            await connection.query(
                'INSERT INTO users (name, email, password, role, wallet_balance, status) VALUES (?, ?, ?, ?, ?, ?)',
                ['Master Admin', 'admin@favtech.com', hashedPassword, 'admin', 999999.99, 'active']
            );
            console.log('👑 Admin user created: admin@favtech.com / adminpassword123');
        } else {
            console.log('ℹ️ Admin user already exists.');
        }

        console.log('\n✨ Database Sync Complete! All systems green.');
    } catch (err) {
        console.error('❌ Database Initialization Failed:', err.message);
    } finally {
        await connection.end();
        process.exit();
    }
}

initializeDatabase();
