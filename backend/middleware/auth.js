const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// Requires a valid admin token (Authorization: Bearer <token>) for every method
const requireToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.warn(`Access denied for ${req.method} ${req.originalUrl} - No token provided`);
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Public reads, admin-only writes: GET passes, anything else needs a token
const authenticateToken = (req, res, next) => {
  if (req.method === 'GET') return next();
  return requireToken(req, res, next);
};

module.exports = authenticateToken;
module.exports.requireToken = requireToken;
