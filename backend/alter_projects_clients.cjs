const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function alterDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Ruchita@12345',
    port: parseInt(process.env.DB_PORT || '3306')
  });

  const dbName = process.env.DB_NAME || 'codigix_admin';

  try {
    await connection.changeUser({ database: dbName });

    console.log('Altering clients table...');
    try {
      await connection.query('ALTER TABLE clients ADD COLUMN name VARCHAR(255)');
      await connection.query('ALTER TABLE clients ADD COLUMN industry VARCHAR(255)');
      await connection.query('ALTER TABLE clients ADD COLUMN website VARCHAR(255)');
      console.log('clients table altered successfully.');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('clients table already has the new columns.');
      } else {
        throw err;
      }
    }

    console.log('Altering projects table...');
    const projectColumns = [
      'ADD COLUMN slug VARCHAR(255)',
      'ADD COLUMN catName VARCHAR(255)',
      'ADD COLUMN subtitle TEXT',
      'ADD COLUMN objective TEXT',
      'ADD COLUMN heroImage VARCHAR(255)',
      'ADD COLUMN businessChallengeDesc TEXT',
      'ADD COLUMN challenges JSON',
      'ADD COLUMN solutionDesc TEXT',
      'ADD COLUMN solutionPoints JSON',
      'ADD COLUMN radialNodes JSON',
      'ADD COLUMN keyFeatures JSON',
      'ADD COLUMN techStack JSON',
      'ADD COLUMN results_impact JSON',
      'ADD COLUMN solutionHighlights JSON',
      'ADD COLUMN testimonial JSON'
    ];

    for (const col of projectColumns) {
      try {
        await connection.query(`ALTER TABLE projects ${col}`);
        console.log(`Added column: ${col}`);
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log(`Column already exists: ${col}`);
        } else {
          console.error(`Error adding column ${col}:`, err);
        }
      }
    }

    console.log('Database alteration completed.');

  } catch (err) {
    console.error('Error altering database:', err);
  } finally {
    await connection.end();
  }
}

alterDatabase();
