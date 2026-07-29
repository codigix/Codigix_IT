const mysql = require('mysql2');
const fs = require('fs');
const conn = mysql.createConnection({
  host: '127.0.0.1',
  port: 3307,
  user: 'codigix_user',
  password: 'C0digix$309',
  database: 'codigix_admin'
});
conn.query('SELECT * FROM projects', (err, rows) => {
  fs.writeFileSync('projects.json', JSON.stringify(err || rows, null, 2));
  conn.end();
});
