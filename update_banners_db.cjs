const path = require('path');
const mysql = require(path.join(__dirname, 'backend/node_modules/mysql2'));
const dotenv = require(path.join(__dirname, 'backend/node_modules/dotenv'));

dotenv.config({ path: path.join(__dirname, 'backend/.env') });

async function updateBanners() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Appuser@123',
    database: process.env.DB_NAME || 'codigix_admin',
    port: parseInt(process.env.DB_PORT || '3306')
  }).promise();

  try {
    await connection.query('DELETE FROM slides');
    
    const slides = [
      [
        'assets/images/hero/slider-1.webp',
        'AI BASED ERP SOFTWARE',
        'ERP Software Development',
        'Streamline your business operations with our AI-powered ERP solutions, designed for maximum efficiency and growth.'
      ],
      [
        'assets/images/hero/slider-2.webp',
        'CRM SOFTWARE SOLUTIONS',
        'CRM Software Development',
        'Enhance customer relationships and drive sales with our sophisticated CRM platforms tailored for your business needs.'
      ],
      [
        'assets/images/hero/slider-1.webp',
        'WEB DEVELOPMENT SERVICES',
        'Customise Website Development',
        'Get a unique, high-performance website that stands out and reflects your brand identity perfectly.'
      ]
    ];

    for (const slide of slides) {
      await connection.query(
        'INSERT INTO slides (image, subtitle, title, description) VALUES (?, ?, ?, ?)',
        slide
      );
    }

    console.log('Successfully updated 3 banners in the database.');
  } catch (err) {
    console.error('Error updating banners:', err.message);
  } finally {
    await connection.end();
  }
}

updateBanners();
