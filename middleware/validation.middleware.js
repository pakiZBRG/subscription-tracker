import { check } from "express-validator";

export const validRegister = [
  check("name", "Name is required")
    .notEmpty()
    .isLength({ min: 4, max: 30 })
    .withMessage("Name must be between 4 and 30 characters"),
  check("email", "Email is required")
    .isEmail()
    .toLowerCase()
    .withMessage("Must be a valid email address"),
  check("password", "Password is required").notEmpty(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters"),
];

export const validLogin = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "Password is requried").notEmpty(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters"),
];
