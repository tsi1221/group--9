const { check, validationResult } = require('express-validator');

const registrationValidationRules = [
  check('firstname').notEmpty().withMessage('First name is required'),
  check('middlename').notEmpty().withMessage('Middle name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password')
    .isLength({ min: 8, max: 10 })
    .withMessage('Password must be 8-10 characters'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = {
  registrationValidationRules,
  validate
};
