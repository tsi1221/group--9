// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const logoutMiddleware = require('../middleware/logoutMiddlewire');
const { logout } = require('../controllers/logOutController');

// Logout route (user must be authenticated)
router.post('/logout', logoutMiddleware, logout);

module.exports = router;
