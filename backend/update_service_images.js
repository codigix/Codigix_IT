const pool = require('./config/db.js');

async function updateServiceImages() {
  const imageMap = {
    'WEB DEVELOPMENT': 'web_dev_dashboard.png',
    'MOBILE APP DEVELOPMENT': 'mobile_app_dashboard.png',
    'CUSTOM SOFTWARE DEVELOPMENT': 'custom_software_dashboard.png',
    'UI/UX DESIGNING': 'ui_ux_designing_dashboard.png',
    'DIGITAL MARKETING': 'digital_marketing_dashboard.png',
    'CMS DEVELOPMENT': 'cms_development_dashboard.png',
    'E-COMMERCE DEVELOPMENT': 'ecommerce_dashboard.png' 
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
