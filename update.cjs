const db = require('./backend/config/db');
async function run() {
  await db.query('UPDATE projects SET image = "https://res.cloudinary.com/foodfantacy/image/upload/v1778342361/0015_lf398t.jpg" WHERE LENGTH(image) > 1000');
  console.log('Fixed large images!');
  process.exit(0);
}
run();
