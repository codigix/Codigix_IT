const { sendEmail } = require('../utils/email');
const { getEmailTemplate, getThankYouTemplate } = require('../utils/emailTemplate');

exports.sendContactMessage = async (req, res) => {
  try {
    const { cfName, cfEmail, cfPhone, cfSubject, cfMessage } = req.body;

    if (!cfName || !cfEmail || !cfMessage) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }

    const subjectMap = {
      '0': 'General Inquiry',
      '1': 'Custom Technology',
      '2': 'AI-Powered Solutions',
      '3': 'Predictive Analytics',
      '4': 'Machine Learning',
      '5': 'Computer Vision',
      '6': 'Language Processing'
    };

    const selectedSubject = subjectMap[cfSubject] || cfSubject || 'No Subject';

    const details = [
      { label: 'Name', value: cfName, icon: '👤' },
      { label: 'Email', value: cfEmail, icon: '✉️' },
      { label: 'Phone', value: cfPhone || 'N/A', icon: '📞' },
      { label: 'Subject', value: selectedSubject, icon: '📄' },
      { label: 'Message', value: cfMessage, icon: '💬' }
    ];

    const emailContent = getEmailTemplate('New Contact Form Submission', details);

    const emailText = `
      New Contact Form Submission
      Name: ${cfName}
      Email: ${cfEmail}
      Phone: ${cfPhone || 'N/A'}
      Subject: ${selectedSubject}
      Message: ${cfMessage}
    `;

    await sendEmail({
      subject: `New Contact Submission: ${selectedSubject}`,
      text: emailText,
      html: emailContent,
      fromName: cfName
    });

    // Send Thank You email to client
    const thankYouContent = getThankYouTemplate();
    await sendEmail({
      to: cfEmail,
      subject: 'Thank You for contacting Codigix!',
      text: 'Thank you for reaching out to Codigix. We have received your message and will get back to you soon.',
      html: thankYouContent,
      fromName: 'Codigix Team'
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};
