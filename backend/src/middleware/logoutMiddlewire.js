const jwt = require('jsonwebtoken');
const prisma = require('../../config/prisma'); // correct import

const logoutMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findFirst({
      where: { id: decoded.id },
      select: { id: true, firstname: true, role: { select: { name: true } } }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = {
      id: user.id,
      firstname: user.firstname,
      role: user.role?.name || null
    };

    next();
  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = logoutMiddleware;
