const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function listTables() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT)
    });

    const [rows] = await connection.query('SHOW TABLES');
    console.log('Tables in database:');
    rows.forEach(row => {
      console.log(Object.values(row)[0]);
    });
    
    await connection.end();
  } catch (err) {
    console.error('Error detail:', err);
  }
}

listTables();
