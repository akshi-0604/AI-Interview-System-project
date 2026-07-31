import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;
