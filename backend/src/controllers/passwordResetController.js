const crypto = require('crypto');
const argon2 = require('argon2');
const prisma = require('../../config/prisma'); // adjust path if needed
const { sendPasswordResetEmail } = require('../services/emailService');
const { createPasswordResetToken, verifyPasswordResetToken } = require('../services/tokenService');

// FORGOT PASSWORD
exports.forgotPassword = async (req, res, next) => {
  try {
    const { identifier } = req.body;
    if (!identifier) return res.status(400).json({ message: "Email or phone is required" });

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    const token = await createPasswordResetToken(user.id);

    // Send email
    await sendPasswordResetEmail(user.email, token);

    res.status(200).json({ message: "If identifier exists, a reset link has been sent" });
  } catch (err) {
    next(err);
  }
}; 

// RESET PASSWORD
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ message: "Token and password are required" });

    const userId = await verifyPasswordResetToken(token);
    if (!userId) return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await argon2.hash(password);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};

