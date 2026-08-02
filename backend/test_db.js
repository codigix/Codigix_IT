const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'codigix_admin',
      port: parseInt(process.env.DB_PORT || '3306')
    });
    console.log('Successfully connected to MySQL!');
    await connection.end();
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}
testConnection();
