const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

exports.login = (req, res) => {
  const { email, password } = req.body;
  // In a real app, you would check against a database
  if (email === 'admin@codigix.com' && password === 'admin123') {
    const token = jwt.sign({ email, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, token, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};
