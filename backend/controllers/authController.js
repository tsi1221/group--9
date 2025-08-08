const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser } = require('../models/userModel');
const { generateToken } = require('../utils/tokenUtils');
const { getUserByEmail } = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
  const {
    role, firstname, middlename, lastname,
    email, password, phone, provider = 'local'
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      role, firstname, middlename, lastname,
      email, password: hashedPassword, phone, provider
    });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });

  }
};

//login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user || user.provider !== 'local') {
      return res.status(400).json({ message: 'Invalid email or method' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};




module.exports = {
  register,login,
};
