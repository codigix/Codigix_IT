const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT } = require('./config/config');
const apiRoutes = require('./routes/api');
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', apiRoutes);

// Verify database connection and start server
const startServer = async () => {
  try {
    await db.getConnection();
    console.log('Successfully connected to the database.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
  }
};

startServer();
