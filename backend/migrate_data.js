require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DATA_FILE = path.join(__dirname, 'data/data.json');

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'codigix_admin'
  });

  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    for (const [entity, items] of Object.entries(data)) {
      console.log(`Migrating ${entity}...`);
      for (const item of items) {
        await connection.query(`INSERT INTO \`${entity}\` SET ? ON DUPLICATE KEY UPDATE id=id`, [item]);
      }
    }
    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error.message);
  } finally {
    await connection.end();
  }
}

migrate();
