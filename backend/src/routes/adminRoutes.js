const express = require('express');
const router = express.Router();
const profileMiddleware = require('../middleware/profileMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');

// Admin metrics
router.get('/dashboard', profileMiddleware, roleMiddleware('ADMIN'), adminController.adminDashboard);

// List users/lawyers
router.get('/users', profileMiddleware, roleMiddleware('ADMIN'), adminController.getAllUsers);
router.get('/lawyers', profileMiddleware, roleMiddleware('ADMIN'), adminController.getAllLawyers);

// CRUD for users
router.get('/users/:id', profileMiddleware, roleMiddleware('ADMIN'), adminController.getUserById);
router.put('/users/:id', profileMiddleware, roleMiddleware('ADMIN'), adminController.updateUser);
router.delete('/users/:id', profileMiddleware, roleMiddleware('ADMIN'), adminController.deleteUser);

// Search
router.get('/search/users', profileMiddleware, roleMiddleware('ADMIN'), adminController.searchUsersByName);
router.get('/search/cases', profileMiddleware, roleMiddleware('ADMIN'), adminController.searchCases);

module.exports = router;
