const path = require('path');
const mysql = require(path.join(__dirname, 'backend/node_modules/mysql2/promise'));
const dotenv = require(path.join(__dirname, 'backend/node_modules/dotenv'));

dotenv.config({ path: path.join(__dirname, 'backend/.env') });

async function alterServicesTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Appuser@123',
    database: process.env.DB_NAME || 'codigix_admin',
    port: parseInt(process.env.DB_PORT || '3306')
  });

  try {
    const [columns] = await connection.query('DESCRIBE services');
    const columnNames = columns.map(c => c.Field);

    const newColumns = [
      { name: 'image', type: 'LONGTEXT' },
      { name: 'overview_title', type: 'VARCHAR(255)' },
      { name: 'overview_desc', type: 'TEXT' },
      { name: 'key_features', type: 'TEXT' }, // Will store as JSON string or comma-separated
      { name: 'secondary_image_1', type: 'LONGTEXT' },
      { name: 'secondary_image_2', type: 'LONGTEXT' },
      { name: 'maintenance_title', type: 'VARCHAR(255)' },
      { name: 'maintenance_desc', type: 'TEXT' },
      { name: 'maintenance_items', type: 'TEXT' }, // Will store as JSON string
      { name: 'faqs', type: 'TEXT' } // Will store as JSON string
    ];

    for (const col of newColumns) {
      if (!columnNames.includes(col.name)) {
        await connection.query(`ALTER TABLE services ADD COLUMN ${col.name} ${col.type}`);
        console.log(`Added column ${col.name}`);
      } else {
        await connection.query(`ALTER TABLE services MODIFY COLUMN ${col.name} ${col.type}`);
        console.log(`Modified column ${col.name} to ${col.type}`);
      }
    }

    console.log('Services table altered successfully.');
  } catch (err) {
    console.error('Error altering services table:', err.message);
  } finally {
    await connection.end();
  }
}

alterServicesTable();
