require('dotenv').config();
const path = require('path');

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'codigix_admin',
  JWT_SECRET: process.env.JWT_SECRET || 'codigix_admin_secret_key_2026',
  DATA_FILE: path.join(__dirname, '../data/data.json')
};
