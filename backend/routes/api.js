const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const entityController = require('../controllers/entityController');
const jobController = require('../controllers/jobController');
const contactController = require('../controllers/contactController');
const blogController = require('../controllers/blogController');
const authenticateToken = require('../middleware/auth');
const { requireToken } = authenticateToken;
const aiController = require('../controllers/aiController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Public Contact route (Must be before dynamic routes)
router.post('/contact', contactController.sendContactMessage);

// Auth routes
router.post('/login', authController.login);

// Image Upload route (admin only). Returns a site-relative URL: behind nginx the
// Host header is the backend's own (localhost:5000), which is unusable on the site.
// /api/uploads is served by server.js and already proxied by nginx with /api.
router.post('/upload', requireToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  res.json({ url: `/api/uploads/${req.file.filename}` });
});

// AI Document Analysis routes (admin only)
router.post('/analyze-case-study', requireToken, upload.single('document'), aiController.analyzeDocument);
router.post('/analyze-case-study-text', requireToken, aiController.analyzeText);
router.post('/analyze-blog-doc', requireToken, upload.single('document'), aiController.analyzeBlogDocument);
router.post('/analyze-blog-text', requireToken, aiController.analyzeBlogText);

// Job application route (public)
router.post('/jobs/apply', jobController.applyForJob);

// Explicit Public GET routes to avoid issues with dynamic matching
const publicEntities = [
    'slides', 
    'services', 
    'projects', 
    'testimonials', 
    'blogs', 
    'clients', 
    'workingProcess', 
    'achievements', 
    'team', 
    'jobs'
];

// Private data (job applications with resumes, contact inquiries, purchase
// orders): readable by a logged-in admin only
const privateEntities = ['purchase_orders', 'inquiries', 'applications'];
privateEntities.forEach(entity => {
    router.get(`/${entity}/count`, requireToken, (req, res) => {
        req.params.entity = entity;
        return entityController.getCount(req, res);
    });
    router.get(`/${entity}`, requireToken, (req, res) => {
        req.params.entity = entity;
        return entityController.getAll(req, res);
    });
    router.get(`/${entity}/:id`, requireToken, (req, res) => {
        req.params.entity = entity;
        return entityController.getById(req, res);
    });
});

publicEntities.forEach(entity => {
    router.get(`/${entity}/count`, (req, res) => {
        req.params.entity = entity;
        return entityController.getCount(req, res);
    });
    router.get(`/${entity}`, (req, res) => {
        req.params.entity = entity;
        return entityController.getAll(req, res);
    });
    router.get(`/${entity}/:id`, (req, res) => {
        req.params.entity = entity;
        return entityController.getById(req, res);
    });
});

// Blog specific interaction routes (must be before generic /:entity routes)
router.put('/blogs/:id/view', blogController.incrementView);
router.put('/blogs/:id/like', blogController.incrementLike);
router.get('/blogs/:id/comments', blogController.getComments);
router.post('/blogs/:id/comments', blogController.addComment);

// Protected entity routes (POST, PUT, DELETE): admin only
router.post('/:entity', requireToken, entityController.create);
router.put('/:entity/:id', requireToken, entityController.update);
router.delete('/:entity/:id', requireToken, entityController.delete);

module.exports = router;
