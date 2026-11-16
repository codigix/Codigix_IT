// Widens blog columns that hold free text (alt text, captions, keywords, tags...)
// from VARCHAR(255) to TEXT, so long AI-generated or pasted values no longer fail
// with "Data too long for column ...". Safe to run more than once: columns that
// are already TEXT are skipped. Existing data is kept.
//
// Run from the backend folder:  node alter_blogs_text_columns.cjs
const db = require('./config/db');

const COLUMNS = {
  image_alt: 'TEXT',
  image_caption: 'TEXT',
  image_credit: 'TEXT',
  seo_title: 'TEXT',
  seo_keywords: 'TEXT',
  focus_keyword: 'TEXT',
  secondary_keywords: 'TEXT',
  tags: 'TEXT',
  social_title: 'TEXT',
  social_image: 'LONGTEXT', // may hold a URL or an inline (base64) image, like `image`
  cta_heading: 'TEXT',
  cta_button_text: 'TEXT',
  cta_button_url: 'TEXT',
  author_designation: 'TEXT'
};

async function run() {
  try {
    const [rows] = await db.query(
      `SELECT COLUMN_NAME, DATA_TYPE FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'blogs'`
    );
    const current = Object.fromEntries(rows.map(r => [r.COLUMN_NAME, r.DATA_TYPE.toLowerCase()]));

    for (const [column, type] of Object.entries(COLUMNS)) {
      if (!current[column]) {
        console.log(`- ${column}: missing, skipped`);
        continue;
      }
      if (current[column] === type.toLowerCase()) {
        console.log(`- ${column}: already ${type}`);
        continue;
      }
      await db.query(`ALTER TABLE blogs MODIFY COLUMN \`${column}\` ${type} NULL`);
      console.log(`- ${column}: ${current[column]} -> ${type}`);
    }
    console.log('Blogs text columns updated.');
  } catch (error) {
    console.error('Error altering blogs table:', error.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
}

run();
