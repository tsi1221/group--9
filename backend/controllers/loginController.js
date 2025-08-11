const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmailOrPhone } = require('../models/userModel');
require('dotenv').config();

const login = async (req, res) => {
  const { emailorPhone, password } = req.body;

  try {
    // Find user by email or phone
    const user = await getUserByEmailOrPhone(emailorPhone);

    if (!user || user.provider !== 'local') {
      return res.status(400).json({ message: 'Invalid email/phone or login method' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

module.exports = {
  login,
};
