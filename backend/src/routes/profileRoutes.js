// src/routes/profileRoutes.js
const express = require('express');
const profileMiddleware = require('../middleware/profileMiddleware');
const { getProfile } = require('../controllers/profileController');

const router = express.Router();

router.get('/profile', profileMiddleware, getProfile);

module.exports = router;
