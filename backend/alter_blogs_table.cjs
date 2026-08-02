const db = require('./config/db');

async function alterTable() {
  try {
    try { await db.query(`ALTER TABLE blogs ADD COLUMN author VARCHAR(255)`); } catch (e) { console.log('author column probably exists'); }
    try { await db.query(`ALTER TABLE blogs ADD COLUMN role VARCHAR(255)`); } catch (e) { console.log('role column probably exists'); }
    try { await db.query(`ALTER TABLE blogs ADD COLUMN readTime VARCHAR(100)`); } catch (e) { console.log('readTime column probably exists'); }
    try { await db.query(`ALTER TABLE blogs ADD COLUMN body TEXT`); } catch (e) { console.log('body column probably exists'); }
    console.log('Blogs table alteration completed.');
  } catch (error) {
    console.error('Error altering table:', error.message);
  } finally {
    process.exit();
  }
}

alterTable().catch(console.error);
