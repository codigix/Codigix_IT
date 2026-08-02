import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const blogDataPath = path.join(__dirname, '../src/data/blogData.js');
const fileContent = fs.readFileSync(blogDataPath, 'utf-8');

// Extract blogPostsData array
let arrayString = fileContent.substring(
  fileContent.indexOf('export const blogPostsData =') + 'export const blogPostsData ='.length,
  fileContent.indexOf('export const getBlogById =')
).trim();

if (arrayString.endsWith(';')) {
  arrayString = arrayString.slice(0, -1);
}

const blogPostsData = eval(`(${arrayString})`);

async function seedBlogs() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Ruchita@12345',
    database: process.env.DB_NAME || 'codigix_admin',
    port: parseInt(process.env.DB_PORT || '3306')
  });

  try {
    console.log('Connected to MySQL. Seeding blog articles...');
    await connection.query('DELETE FROM blogs');

    for (const post of blogPostsData) {
      const query = `
        INSERT INTO blogs (title, category, date, image, author, role, readTime, body)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        post.title,
        post.category,
        post.date,
        post.image,
        post.author,
        post.role || 'Technical Lead',
        post.readTime || '6 min read',
        post.excerpt || (typeof post.content === 'string' ? post.content : 'Technology insights article.')
      ];

      await connection.query(query, values);
      console.log(`Inserted Blog: ${post.title}`);
    }

    console.log('Successfully populated all 14 blog articles into MySQL!');
  } catch (err) {
    console.error('Error seeding blogs DB:', err.message);
  } finally {
    await connection.end();
  }
}

seedBlogs();
