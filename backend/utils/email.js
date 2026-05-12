const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: `"${options.fromName || 'Codigix Website'}" <${config.SMTP_FROM}>`,
    to: options.to || config.SMTP_FROM,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
