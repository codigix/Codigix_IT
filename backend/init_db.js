const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Ruchita@12345',
    port: parseInt(process.env.DB_PORT || '3306')
  });

  const dbName = process.env.DB_NAME || 'codigix_admin';

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database "${dbName}" created or already exists.`);
    
    await connection.changeUser({ database: dbName });

    // Create Tables
    const tables = [
      `CREATE TABLE IF NOT EXISTS slides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image VARCHAR(255),
        subtitle VARCHAR(255),
        title VARCHAR(255),
        description TEXT
      )`,
      `CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        num VARCHAR(50),
        title VARCHAR(255),
        \`desc\` TEXT,
        image VARCHAR(255)
      )`,
      `CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(255),
        image VARCHAR(255),
        overview TEXT,
        goals TEXT,
        technology_stack TEXT,
        results TEXT,
        client VARCHAR(255),
        budget VARCHAR(255),
        gallery TEXT,
        client_logo VARCHAR(255)
      )`,
      `CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        quote TEXT,
        author VARCHAR(255),
        designation VARCHAR(255),
        image VARCHAR(255)
      )`,
      `CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(255),
        date VARCHAR(100),
        image VARCHAR(255)
      )`,
      `CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image VARCHAR(255)
      )`,
      `CREATE TABLE IF NOT EXISTS workingProcess (
        id INT AUTO_INCREMENT PRIMARY KEY,
        step VARCHAR(50),
        title VARCHAR(255),
        icon VARCHAR(100),
        \`desc\` TEXT
      )`,
      `CREATE TABLE IF NOT EXISTS achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        num VARCHAR(50),
        title VARCHAR(255),
        year VARCHAR(50)
      )`,
      `CREATE TABLE IF NOT EXISTS team (
        id INT AUTO_INCREMENT PRIMARY KEY,
        num INT,
        name VARCHAR(255),
        position VARCHAR(255)
      )`,
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin'
      )`,
      `CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        type VARCHAR(100),
        description TEXT,
        requirements TEXT,
        date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_id INT,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        resume_url VARCHAR(255),
        cover_letter TEXT,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
      )`
    ];

    for (const tableQuery of tables) {
      await connection.query(tableQuery);
    }
    console.log('Tables created successfully.');

    // Insert default admin user
    const [userRows] = await connection.query('SELECT * FROM users WHERE email = ?', ['admin@codigix.com']);
    if (userRows.length === 0) {
      await connection.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', ['admin@codigix.com', 'admin123', 'admin']);
      console.log('Default admin user created.');
    }

  } catch (error) {
    console.error('Error initializing database:', error.message);
  } finally {
    await connection.end();
  }
}

initializeDatabase();
