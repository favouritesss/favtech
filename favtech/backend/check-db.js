const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkDb() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });
    console.log('Connected to MySQL');
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'favtech'}`);
    console.log('Database ensured');
    await connection.end();
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
}

checkDb();
