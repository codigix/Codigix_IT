require('dotenv').config();
const mysql = require('mysql2/promise');

async function updateAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'codigix_admin'
  });

  try {
    await connection.query('UPDATE users SET email = ?, password = ? WHERE id = 1', ['admin@example.com', '123456']);
    console.log('Admin credentials updated successfully to admin@example.com / 123456');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await connection.end();
  }
}

updateAdmin();
