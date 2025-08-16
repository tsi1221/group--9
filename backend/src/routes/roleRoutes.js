const express = require('express');
const router = express.Router();
const profileMiddleware = require('../middleware/profileMiddleware'); 
const roleMiddleware = require('../middleware/roleMiddleware');
const { adminDashboard, lawyerDashboard, userDashboard } = require('../controllers/roleControler');

// Only admin can access admin dashboard
router.get('/admin/dashboard', profileMiddleware, roleMiddleware('ADMIN'), adminDashboard);

// Only lawyer can access lawyer dashboard
router.get('/lawyer/dashboard', profileMiddleware, roleMiddleware('LAWYER'), lawyerDashboard);

// Only normal users can access user dashboard
router.get('/user/dashboard', profileMiddleware, roleMiddleware('USER'), userDashboard);

module.exports = router;
