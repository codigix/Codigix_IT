const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
const { PORT, CLIENT_URL, NODE_ENV } = require('./config/config');
const apiRoutes = require('./routes/api');
const db = require('./config/db');

const app = express();

app.use(compression());
app.use(cors({
  origin: true, // Reflect request origin back (allows all)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve uploads with cache control (1 year)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1y',
  immutable: true
}));

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend static files in production
if (NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath, {
    maxAge: '1y',
    setHeaders: (res, path) => {
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

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
