// const mysql = require('mysql2/promise');
// const config = require('./config');

// const pool = mysql.createPool({
//   host: config.DB_HOST,
//   user: config.DB_USER,
//   password: config.DB_PASSWORD,
//   database: config.DB_NAME,
//    port: 3307, 
//   waitForConnections: true,
//   connectionLimit: 10,
   
//   queueLimit: 0
// });
// // module.exports = db;
// module.exports = pool;
const mysql = require('mysql2/promise');
console.log("Connecting DB HOST = 127.0.0.1");
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'appuser',
  password: 'Appuser@123',
  database: 'codigix_admin',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = pool;