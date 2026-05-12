const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const entityController = require('../controllers/entityController');
const jobController = require('../controllers/jobController');
const contactController = require('../controllers/contactController');
const authenticateToken = require('../middleware/auth');

// Public Contact route (Must be before dynamic routes)
router.post('/contact', contactController.sendContactMessage);

// Auth routes
router.post('/login', authController.login);

// Job application route (public)
router.post('/jobs/apply', jobController.applyForJob);

// Public entity routes (GET)
router.get('/:entity', entityController.getAll);
router.get('/:entity/:id', entityController.getById);

// Protected entity routes (POST, PUT, DELETE)
router.post('/:entity', authenticateToken, entityController.create);
router.put('/:entity/:id', authenticateToken, entityController.update);
router.delete('/:entity/:id', authenticateToken, entityController.delete);

module.exports = router;
