const pool = require('./config/db.js');

async function updateServiceImages() {
  const imageMap = {
    'WEB DEVELOPMENT': 'web_dev_dashboard.webp',
    'MOBILE APP DEVELOPMENT': 'mobile_app_dashboard.webp',
    'CUSTOM SOFTWARE DEVELOPMENT': 'custom_software_dashboard.webp',
    'UI/UX DESIGNING': 'ui_ux_designing_dashboard.webp',
    'DIGITAL MARKETING': 'digital_marketing_dashboard.webp',
    'CMS DEVELOPMENT': 'cms_development_dashboard.webp',
    'E-COMMERCE DEVELOPMENT': 'ecommerce_dashboard.webp'
  };

  try {
    for (const [title, image] of Object.entries(imageMap)) {
      console.log(`Updating ${title} with ${image}`);
      await pool.query('UPDATE services SET image = ? WHERE title = ?', [image, title]);
    }
    console.log("Successfully updated all service images!");
  } catch (error) {
    console.error("Error updating service images:", error);
  } finally {
    process.exit(0);
  }
}

updateServiceImages();
