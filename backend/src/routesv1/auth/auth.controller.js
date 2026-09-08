import express from "express";
import passport from "passport";
import AuthService from "./auth.service.js";

const router = express.Router();
const authService = new AuthService();
const authLocal = passport.authenticate("local", { session: false });

/**
 * Admin Login Handler
 */
router.post("/admin/login", authLocal, async (req, res) => {
  try {
    const userRole = req.user?.user_type?.toLowerCase();

    if (userRole !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Access denied. Admin privileges required.",
      });
    }

    const token = await authService.adminLogin(req.user);

    return res.status(200).json({
      success: true,
      message: "Admin authenticated successfully",
      data: {
        token,
        user: {
          id: req.user.id || req.user._id,
          email: req.user.email,
          user_type: req.user.user_type,
        },
      },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

/**
 * User Signup Handler
 */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Email is required.",
      });
    }

    if (!phone?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Phone number is required.",
      });
    }

    if (!password || password.length < 4) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 4 characters.",
      });
    }

    // Pass plain password directly to authService (it handles hashing inside)
    const result = await authService.signup(name, email, password, phone);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Failed to register user",
    });
  }
});

/**
 * Standard User Login Handler
 */
router.post("/login", authLocal, async (req, res) => {
  try {
    const token = await authService.login(req.user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

export default router;