const { check, validationResult } = require('express-validator');
const { z } = require('zod');

const registrationValidationRules = [
  check('firstname')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters'),
  
  check('middlename')
    .isLength({ min: 3 })
    .withMessage('Middle name must be at least 3 characters'),
  
  check('lastname')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters'),
  
  check('email')
    .isEmail()
    .withMessage('Valid email is required'),

  check('phone')
    .matches(/^\+?\d{1,13}$/)
    .withMessage('Phone must be numeric, optional leading +, max 13 digits'),

  check('password')
    .isLength({ min: 8, max: 10 })
    .withMessage('Password must be 8-10 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character'),
];

const loginValidationRules = [
  check('identifier').notEmpty().withMessage('Email or phone is required'),
  check('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};


exports.emailSchema = z.object({
  email: z.string().email("Invalid email format")
});

exports.passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters")
});

module.exports = {
  registrationValidationRules,
  loginValidationRules,
  validate,
};
