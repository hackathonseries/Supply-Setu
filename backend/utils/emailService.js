const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,       // Your Gmail ID
    pass: process.env.EMAIL_PASS      // App Password (not normal password)
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📨 Email sent to ${to}`);
  } catch (error) {
    console.error(' Email error:', error.message);
  }
};

module.exports = sendEmail;