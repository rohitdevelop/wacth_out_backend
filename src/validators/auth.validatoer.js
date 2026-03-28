const { body } = require( "express-validator");

  const registerValidation = [
   body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3, max: 30 }).withMessage("Name must be 3-30 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("Name must contain only letters"),

   body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isLength({ min: 6 }).withMessage("Email too short")
    .isEmail().withMessage("Invalid email format")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("Email must be valid (example: user@gmail.com)"),

   body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6, max: 8 }).withMessage("Password must be 6-8 characters")
    .matches(/[A-Z]/).withMessage("Must contain at least 1 uppercase letter")
    .matches(/[a-z]/).withMessage("Must contain at least 1 lowercase letter")
    .matches(/[0-9]/).withMessage("Must contain at least 1 number")
    .matches(/[@$!%*?&]/).withMessage("Must contain special character (@$!%*?&)")
    .not()
    .matches(/\s/)
    .withMessage("Password must not contain spaces"),
];

module.exports = registerValidation