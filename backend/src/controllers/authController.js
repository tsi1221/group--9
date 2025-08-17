require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser } = require('../models/userModel');

const register = async (req, res) => {
  const {
    firstname, middlename, lastname,
    email, password, address, phone, 
    provider = 'local', roleId = 2 // Default to 2 (regular user) if not provided
  } = req.body;

  // Validate required fields
  if (!firstname || !lastname || !email || !password || !address || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await createUser({
      firstname, 
      middlename, 
      lastname,
      email, 
      password: hashedPassword, 
      address, 
      phone, 
      provider, 
      roleId // Make sure this matches a valid role ID in your database
    });

    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.status(201).json({ 
      user: {
        id: user.id,
        firstname: user.firstname,
        email: user.email,
        roleId: user.roleId
      }, 
      token 
    });
  } catch (err) {
    console.error('Registration error:', err);
    
    if (err.message.includes('Foreign key constraint')) {
      return res.status(400).json({ 
        error: 'Invalid role specified' 
      });
    }
    
    res.status(500).json({ 
      error: err.message || 'Server error during registration' 
    });
  }
};

module.exports = {
  register,
};