const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controllers/passwordResetController');

// Use destructured controller functions directly
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
