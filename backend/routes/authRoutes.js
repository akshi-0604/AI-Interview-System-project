import express from "express";
import {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

router.post("/google", googleLogin);

// Forgot Password
router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;
