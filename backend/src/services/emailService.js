const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Sends a password reset email to the specified recipient
 * @param {string} to - Recipient email address
 * @param {string} token - Unique reset token
 */
module.exports.sendPasswordResetEmail = async (to, token) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Fithaber Ethiopia" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset Instructions - Fithaber Ethiopia',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #fdfafaff;">
        <h2 style="color: #2d86faff;">Fithaber Ethiopia</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Please click the link below to set a new password:</p>
        <p>
          <a href="${resetLink}" style="background-color: #2d80ecff; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
            Reset Your Password
          </a>
        </p>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <br>
        <p>Thank you,</p>
        <p><strong>Fithaber Ethiopia Team</strong></p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
