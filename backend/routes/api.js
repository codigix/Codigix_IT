const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const entityController = require('../controllers/entityController');
const authenticateToken = require('../middleware/auth');

// Auth routes
router.post('/login', authController.login);

// Public entity routes (GET)
router.get('/:entity', entityController.getAll);
router.get('/:entity/:id', entityController.getById);

// Protected entity routes (POST, PUT, DELETE)
router.post('/:entity', authenticateToken, entityController.create);
router.put('/:entity/:id', authenticateToken, entityController.update);
router.delete('/:entity/:id', authenticateToken, entityController.delete);

module.exports = router;
