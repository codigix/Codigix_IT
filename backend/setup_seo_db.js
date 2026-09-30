const pool = require('./config/db.js');

async function run() {
  try {
    console.log('Creating table page_seo if it does not exist...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_seo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_name VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255),
        description TEXT,
        keywords TEXT,
        canonical VARCHAR(255),
        og_image VARCHAR(255),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Table page_seo created or already exists.');

    console.log('Inserting initial SEO data for the home page...');
    await pool.query(
      `INSERT IGNORE INTO page_seo (page_name, title, description, keywords, canonical, og_image) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        'home',
        'Software Development Company in Pune | Codigix',
        'Codigix is a software development company in Pune offering AI, ERP, Industrial IoT, CRM & custom software solutions. Get a consultation today.',
        'software development company Pune, custom software development Pune, AI development company Pune, AI solutions Pune, Industrial IoT solutions Pune, IoT development company Pune, ERP software development Pune, manufacturing ERP Pune, custom ERP software Pune, Industry 4.0 solutions Pune, business automation Pune, CRM software development Pune',
        'https://codigixinfotech.com/',
        'https://codigixinfotech.com/assets/images/logos/logo.webp'
      ]
    );
    console.log('Seed data inserted successfully.');
    process.exit(0);
  } catch (e) {
    console.error('Error setting up the database:', e);
    process.exit(1);
  }
}

run();
