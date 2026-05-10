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
   .isLength({ min: 6, max: 8 }).withMessage("Password must be 6-8 chars")
     .withMessage("Password must not contain spaces"),

];

module.exports = registerValidation