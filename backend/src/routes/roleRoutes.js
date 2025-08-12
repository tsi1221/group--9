const express = require('express');
const router = express.Router();
const profileMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getProfile, adminDashboard, lawyerDashboard, userDashboard } = require('../controllers/profileController');

// All roles can access profile
router.get('/api/auth/profile', profileMiddleware, getProfile);

// Only admin can access admin dashboard
router.get('/api/admin/dashboard', profileMiddleware, roleMiddleware('admin'), adminDashboard);

// Only lawyer can access lawyer dashboard
router.get('/api/lawyer/dashboard', roleMiddleware, roleMiddleware('lawyer'), lawyerDashboard);

// Only normal users can access user dashboard
router.get('/api/user/dashboard', roleMiddleware, roleMiddleware('user'), userDashboard);

// If multiple roles allowed (e.g. admin and lawyer)
router.get('/api/special', roleMiddleware, roleMiddleware('admin', 'lawyer'), (req, res) => {
  res.send('Special access for admins and lawyers');
});
