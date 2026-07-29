const db = require('./backend/config/db');
async function run() {
  const [rows] = await db.query('DESCRIBE projects');
  console.log(rows);
  const [data] = await db.query('SELECT * FROM projects LIMIT 1');
  console.log(Object.keys(data[0]));
  process.exit(0);
}
run();
