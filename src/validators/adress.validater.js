const {body} = require("express-validator");

const addressValidation = [
    body("street")
    .trim()
    .notEmpty().withMessage("Street is required"),

    body("city")
    .trim()
    .notEmpty().withMessage("City is required"),

    body("state")
    .trim()
    .notEmpty().withMessage("State is required"),

    body("zipcode")
    .trim()
    .notEmpty().withMessage("Zip code is required")
    .isLength({ exact: 5 }).withMessage("Zip code must be 5 characters"),

    body("country")
    .trim()
    .notEmpty().withMessage("Country is required")
]

module.exports = addressValidation
