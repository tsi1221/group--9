const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const { login} = require('../controllers/loginController');
const {registrationValidationRules, loginValidationRules,validate} = require('../middleware/validateInput');

router.post('/register', registrationValidationRules, validate, register);
router.post('/login', loginValidationRules, validate, login);

module.exports = router;
