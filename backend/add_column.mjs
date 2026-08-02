import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

async function alterDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'appuser',
    password: process.env.DB_PASSWORD || 'Appuser@123',
    database: process.env.DB_NAME || 'codigix_admin',
    port: parseInt(process.env.DB_PORT || '3306')
  });

  try {
    await connection.query('ALTER TABLE projects ADD COLUMN sidebarSpecs JSON');
    console.log('Added sidebarSpecs column');
  } catch (err) {
    console.log(err.message);
  } finally {
    await connection.end();
  }
}
alterDB();
