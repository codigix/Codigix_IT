const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function migrateProjectsTable() {
  const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'appuser',
    password: process.env.DB_PASSWORD || 'Appuser@123',
    database: process.env.DB_NAME || 'codigix_admin',
    port: parseInt(process.env.DB_PORT || '3306')
  };

  console.log('Connecting with config:', { ...connectionConfig, password: '***' });

  const connection = await mysql.createConnection(connectionConfig);

  try {
    console.log('Altering projects table...');
    
    const [columns] = await connection.query('DESCRIBE projects');
    const existingColumns = columns.map(c => c.Field);

    const columnsToAdd = [
      { name: 'overview', type: 'TEXT' },
      { name: 'goals', type: 'TEXT' },
      { name: 'technology_stack', type: 'TEXT' },
      { name: 'results', type: 'TEXT' },
      { name: 'client', type: 'VARCHAR(255)' },
      { name: 'budget', type: 'VARCHAR(255)' },
      { name: 'gallery', type: 'TEXT' },
      { name: 'client_logo', type: 'VARCHAR(255)' }
    ];

    for (const col of columnsToAdd) {
      if (!existingColumns.includes(col.name)) {
        await connection.query(`ALTER TABLE projects ADD COLUMN ${col.name} ${col.type}`);
        console.log(`Added column ${col.name}`);
      }
    }

    console.log('Projects table altered successfully.');
  } catch (error) {
    console.error('Migration failed:', error.message);
  } finally {
    await connection.end();
  }
}

migrateProjectsTable();
