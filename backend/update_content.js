require('dotenv').config();
const mysql = require('mysql2/promise');

async function updateWebsiteContent() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'codigix_admin'
  });

  try {
    // 1. Clear existing services and projects (optional, or just update)
    await connection.query('TRUNCATE TABLE services');
    await connection.query('TRUNCATE TABLE projects');

    // 2. Insert Services from codigix.co
    const services = [
      ['01', 'WEB DEVELOPMENT & DESIGN', 'From traditional websites to decentralized applications (dApps), we craft responsive, secure, and visually appealing web experiences for modern users.', 'service-1'],
      ['02', 'MOBILE APP DEVELOPMENT', 'We design and develop intuitive mobile apps for iOS and Android platforms — native, hybrid, or cross-platform — to help you engage users on the go.', 'service-2'],
      ['03', 'ERP SOLUTIONS', 'Streamline and automate your business operations like HR, finance, inventory, and more with powerful ERP systems tailored to your organization.', 'service-3'],
      ['04', 'CRM DEVELOPMENT', 'Manage customer relationships effectively with custom CRM platforms or integrations with tools like Salesforce, Zoho, and HubSpot.', 'service-4'],
      ['05', 'UI/UX DESIGN', 'We focus on crafting user interfaces that are visually engaging and user experiences that are smooth, intuitive, and conversion-friendly.', 'service-5'],
      ['06', 'CMS DEVELOPMENT', 'Build and manage your content or e-commerce site with flexible CMS platforms like WordPress, Shopify, or headless CMS solutions.', 'service-6'],
      ['07', 'E-COMMERCE DEVELOPMENT', 'Launch and grow your online store with secure, scalable, and feature-rich e-commerce platforms, customized for your products and customers.', 'service-7']
    ];

    for (const s of services) {
      await connection.query('INSERT INTO services (num, title, `desc`, image) VALUES (?, ?, ?, ?)', s);
    }

    // 3. Insert Recent Work (Projects)
    const projects = [
      ['BRAINLANCE SOLUTIONS', 'CUSTOM SOFTWARE', 'project-1'],
      ['HR MANAGEMENT SOLUTION', 'Business Management Software', 'project-2'],
      ['NEEM FURNITURE', 'E-COMMERCE', 'project-3'],
      ['HOTTIP MANAGEMENT', 'Web Development', 'project-4'],
      ['WAARI TOURS & TRAVEL', 'CRM Software', 'project-5'],
      ['PASSION CLOTHING', 'E-COMMERCE', 'project-6']
    ];

    for (const p of projects) {
      await connection.query('INSERT INTO projects (title, category, image) VALUES (?, ?, ?)', p);
    }

    console.log('Website content updated successfully.');
  } catch (error) {
    console.error('Update failed:', error.message);
  } finally {
    await connection.end();
  }
}

updateWebsiteContent();
