const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser } = require('../models/userModel');
// const { generateToken } = require('../utils/tokenUtils');
// const { getUserByEmail } = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
  const {
    role, firstname, middlename, lastname,
    email, password,address, phone, provider = 'local',roleId
  } = req.body;



  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      role, firstname, middlename, lastname,
      email, password: hashedPassword, address,phone, provider,roleId
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


module.exports = {
  register,
};
