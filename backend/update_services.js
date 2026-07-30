const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: '127.0.0.1',
  port: 3307,
  user: 'codigix_user',
  password: 'C0digix$309',
  database: 'codigix_admin'
});

const updates = [
  { id: 1, image: 'ui_ux_dashboard.webp' },
  { id: 2, image: 'app_dev_dashboard.webp' },
  { id: 3, image: 'web_dev_dashboard.webp' },
  { id: 4, image: 'crm_dashboard.webp' },
  { id: 5, image: 'erp_dashboard.webp' },
  { id: 6, image: 'cms_dashboard.webp' },
  { id: 7, image: 'ecommerce_dashboard.webp' }
];

let completed = 0;
updates.forEach(update => {
  conn.query('UPDATE services SET image = ? WHERE id = ?', [update.image, update.id], (err, result) => {
    if (err) console.error(err);
    else console.log(`Updated service ${update.id} to ${update.image}`);

    completed++;
    if (completed === updates.length) {
      console.log('All updates completed.');
      conn.end();
    }
  });
});
