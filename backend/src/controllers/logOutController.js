// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const { addToken } = require('../services/tokenBlacklist');

const logout = (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Decode token to get expiry
    const decoded = jwt.decode(token);
    const expiry = decoded.exp - Math.floor(Date.now() / 1000);

    addToken(token, expiry);

    res.json({ message: 'Successfully logged out' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Logout failed' });
  }  
};

module.exports = { logout }; // ✅ Correct export
