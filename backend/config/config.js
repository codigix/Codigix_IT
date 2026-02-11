const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'codigix_admin',
  JWT_SECRET: process.env.JWT_SECRET || 'codigix_admin_secret_key_2026',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  DATA_FILE: path.join(__dirname, '../data/data.json')
};
