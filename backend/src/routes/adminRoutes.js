const express = require('express');
const router = express.Router();
const profileMiddleware = require('../middleware/profileMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const adminController = require('../controllers/adminController');

// Admin dashboard metrics
router.get('/dashboard', profileMiddleware, roleMiddleware('ADMIN'), adminController.adminDashboard);

// CRUD for users/lawyers
router.post('/create', profileMiddleware, roleMiddleware('ADMIN'), adminController.createUserOrLawyer);
router.get('/users', profileMiddleware, roleMiddleware('ADMIN'), adminController.getAllUsers);
router.get('/lawyers', profileMiddleware, roleMiddleware('ADMIN'), adminController.getAllLawyers);
router.get('/:id', profileMiddleware, roleMiddleware('ADMIN'), adminController.getUserOrLawyerById);
router.put('/:id', profileMiddleware, roleMiddleware('ADMIN'), adminController.updateUserOrLawyer);
router.delete('/:id', profileMiddleware, roleMiddleware('ADMIN'), adminController.deleteUserOrLawyer);

// Search users/lawyers
router.get('/search/users', profileMiddleware, roleMiddleware('ADMIN'), adminController.searchUsersByName);

// Search cases
router.get('/search/cases', profileMiddleware, roleMiddleware('ADMIN'), adminController.searchCases);

module.exports = router;
