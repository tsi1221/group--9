const prisma = require('../../config/prisma');
const jwt = require('jsonwebtoken');
const profileMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token received:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Fix: Use lowercase 'id' as per decoded token
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
    role: {
      select: {
        name: true
      }
    }
  }
});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = {
  id: user.id,
  firstname: user.firstname,
  middlename: user.middlename,
  lastname: user.lastname,
  email: user.email,
  phone: user.phone,
  address: user.address,
  provider: user.provider,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  role: user.role.name
};

    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = profileMiddleware;
