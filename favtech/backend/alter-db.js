require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'favtech',
  });

  try {
    await conn.query(
      "ALTER TABLE users MODIFY COLUMN role ENUM('user','admin','support','finance') DEFAULT 'user'"
    );
    console.log('✅ users.role ENUM updated (added finance)');
  } catch (e) {
    console.log('⚠️  role alter note:', e.message);
  }

  try {
    await conn.query(
      "ALTER TABLE users MODIFY COLUMN status ENUM('active','suspended','banned') DEFAULT 'active'"
    );
    console.log('✅ users.status ENUM updated (added banned)');
  } catch (e) {
    console.log('⚠️  status alter note:', e.message);
  }

  // Ensure system_logs table exists (in case it was added after initial init)
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS system_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        metadata JSON,
        ip_address VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ system_logs table ensured');
  } catch (e) {
    console.log('⚠️  system_logs note:', e.message);
  }

  await conn.end();
  console.log('\n✨ Database alterations complete.');
})();
