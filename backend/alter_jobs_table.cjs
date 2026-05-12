const db = require('./config/db');

async function alterTable() {
  try {
    try { await db.query(`ALTER TABLE jobs ADD COLUMN experience VARCHAR(255) AFTER type`); } catch (e) { console.log('experience column probably exists'); }
    try { await db.query(`ALTER TABLE jobs ADD COLUMN company VARCHAR(255) AFTER title`); } catch (e) { console.log('company column probably exists'); }
    try { await db.query(`ALTER TABLE jobs ADD COLUMN responsibilities TEXT AFTER description`); } catch (e) { console.log('responsibilities column probably exists'); }
    try { await db.query(`ALTER TABLE jobs ADD COLUMN skills TEXT AFTER responsibilities`); } catch (e) { console.log('skills column probably exists'); }
    try { await db.query(`ALTER TABLE jobs ADD COLUMN qualifications TEXT AFTER skills`); } catch (e) { console.log('qualifications column probably exists'); }
    console.log('Jobs table check/alteration completed.');
  } catch (error) {
    console.error('Error altering table:', error.message);
  } finally {
    process.exit();
  }
}

alterTable().catch(console.error);
