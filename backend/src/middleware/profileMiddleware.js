// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const prisma = require('../../config/prisma');

const profileMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        firstname: true,
        middlename: true,
        lastname: true,
        email: true,
        phone: true,
        address: true,
        provider: true,
        createdAt: true,
        updatedAt: true,
        role: { select: { name: true } }
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid token - user not found' });
    }

    req.user = { ...user, role: user.role.name };
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = profileMiddleware;
