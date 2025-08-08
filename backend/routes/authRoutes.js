const express = require('express');
const router = express.Router();
const { register ,login} = require('../controllers/authController');
const {
  registrationValidationRules, validate
} = require('../middleware/validateInput');

router.post('/register', registrationValidationRules, validate, register);
router.post('/login', login);


module.exports = router;
