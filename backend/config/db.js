const mysql = require('mysql2/promise');
const config = require('./config');

console.log(`Connecting to DB: ${config.DB_HOST}:${config.DB_PORT}`);

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  port: parseInt(config.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
