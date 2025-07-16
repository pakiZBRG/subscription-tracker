import { check } from "express-validator";

export const validateUser = [
  check("name", "Name is required")
    .notEmpty()
    .isLength({ min: 4, max: 30 })
    .withMessage("Name must be between 4 and 30 characters"),
  check("email", "Email is required")
    .notEmpty()
    .isEmail()
    .withMessage("Must be a valid email address")
    .toLowerCase(),
  check("password", "Password is required")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters"),
];

export const validLogin = [
  check("password", "Password is required")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters"),
];
