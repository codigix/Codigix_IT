const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sendEmail } = require('../utils/email');
const { getEmailTemplate } = require('../utils/emailTemplate');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'resumes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb(new Error('Error: Resumes must be PDF or DOC/DOCX!'));
  }
}).single('resume');

exports.applyForJob = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: 'Please upload a resume' });
    }

    const { job_id, name, email, phone, cover_letter } = req.body;
    console.log(`Application for job ${job_id} from ${name}`);
    const resume_url = `/uploads/resumes/${req.file.filename}`;

    try {
      const [result] = await db.query(
        'INSERT INTO applications (job_id, name, email, phone, resume_url, cover_letter) VALUES (?, ?, ?, ?, ?, ?)',
        [job_id, name, email, phone, resume_url, cover_letter]
      );

      const details = [
        { label: 'Job ID', value: job_id, icon: '🆔' },
        { label: 'Name', value: name, icon: '👤' },
        { label: 'Email', value: email, icon: '✉️' },
        { label: 'Phone', value: phone || 'N/A', icon: '📞' },
        { label: 'Resume', value: `<a href="https://codigixinfotech.com${resume_url}" target="_blank" style="color: #0056b3; text-decoration: none; font-weight: bold;">Download Resume</a>`, icon: '📄' },
        { label: 'Cover Letter', value: cover_letter || 'No cover letter provided.', icon: '✉️' }
      ];

      const emailContent = getEmailTemplate('New Job Application Received', details);

      await sendEmail({
        subject: `New Job Application: ${name}`,
        html: emailContent,
        text: `New job application from ${name} for Job ID ${job_id}. Resume: ${resume_url}`
      }).catch(err => console.error('Failed to send application email:', err));

      res.status(201).json({ id: result.insertId, message: 'Application submitted successfully!' });
    } catch (dbErr) {
      res.status(500).json({ error: dbErr.message });
    }
  });
};
