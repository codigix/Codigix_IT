// require('dotenv').config();
// const path = require('path');

// module.exports = {
//   PORT: process.env.PORT || 5000,
//   DB_HOST: process.env.DB_HOST || 'localhost',
//   DB_USER: process.env.DB_USER || 'root',
//   DB_PASSWORD: process.env.DB_PASSWORD || 'Ruchita@12345',
//   DB_NAME: process.env.DB_NAME || 'codigix_admin',
//   JWT_SECRET: process.env.JWT_SECRET || 'codigix_admin_secret_key_2026',
//   DATA_FILE: path.join(__dirname, '../data/data.json')
// };
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'appuser',
  DB_PASSWORD: process.env.DB_PASSWORD || 'Appuser@123',
  DB_NAME: process.env.DB_NAME || 'codigix_admin',
  DB_PORT: process.env.DB_PORT || 3306,
  JWT_SECRET: process.env.JWT_SECRET || 'codigix_admin_secret_key_2026',
  CLIENT_URL: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:5173'],
  DATA_FILE: path.join(__dirname, '../data/data.json')
}; 