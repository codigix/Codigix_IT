const db = require('./backend/config/db');
async function checkImages() {
  try {
    const [rows] = await db.query('SELECT id, title, image FROM projects');
    console.log('Projects images:');
    rows.forEach(r => {
        const imgDisplay = r.image ? (r.image.length > 50 ? r.image.substring(0, 50) + '...' : r.image) : 'null';
        console.log(`ID: ${r.id}, Title: ${r.title}, Image: ${imgDisplay}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
checkImages();
