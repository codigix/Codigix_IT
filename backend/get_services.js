const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: '127.0.0.1',
  port: 3307,
  user: 'codigix_user',
  password: 'C0digix$309',
  database: 'codigix_admin'
});
conn.query('SELECT * FROM services', (err, rows) => {
  console.dir(err || rows, {depth: null, colors: true});
  conn.end();
});
