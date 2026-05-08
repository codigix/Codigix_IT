const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT, CLIENT_URL, NODE_ENV } = require('./config/config');
const apiRoutes = require('./routes/api');
const db = require('./config/db');

const app = express();

app.use(cors({
  origin: true, // Reflect request origin back (allows all)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}));
app.use(bodyParser.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', apiRoutes);

// Verify database connection and start server
const startServer = async () => {
  try {
    console.log('Attempting to connect to the database...');
    await db.getConnection();
    console.log('Successfully connected to the database.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`API Base: http://localhost:${PORT}/api`);
    });
  } catch (err) {
    console.error('CRITICAL ERROR: Unable to connect to the database!');
    console.error('Error details:', err.message);
    console.error('Please check your .env file and ensure MySQL is running on the specified port.');
    // Don't exit in development so the health check might still work? 
    // Actually, most routes need DB, but let's at least keep it alive if possible or exit.
    // For now, keep exit to follow original behavior but with better logs.
    process.exit(1);
  }
};

startServer();
