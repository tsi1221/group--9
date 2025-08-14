const crypto = require('crypto');
const prisma = require('../../config/prisma');

exports.createPasswordResetToken = async (userId) => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.passwordResetToken.create({
    data: {
      token: hashedToken,
      userId,
      expiresAt
    }
  });

  return resetToken; // send plain token to user email
};

exports.verifyPasswordResetToken = async (token) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const resetRecord = await prisma.passwordResetToken.findUnique({
    where: { token: hashedToken },
    include: { user: true }
  });

  if (!resetRecord || resetRecord.expiresAt < new Date()) {
    return null;
  }

  return resetRecord.user;
};

exports.invalidateToken = async (token) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  await prisma.passwordResetToken.delete({ where: { token: hashedToken } }).catch(() => {});
};
