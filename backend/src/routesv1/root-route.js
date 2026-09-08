import express from "express";
import authRoutes from "./auth/auth.controller.js";
import userRoutes from "./user/user.controller.js";
import categoryRoutes from "./category/category.controller.js";
import productRoutes from "./product/product.controller.js";

const router = express.Router();

// Auth & User routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

// Category & Product routes
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;