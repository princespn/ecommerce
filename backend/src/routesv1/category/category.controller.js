import express from "express";
import { insertCategoryValidator } from "../../db/schemas/categories.js";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "./category.service.js";

const router = express.Router();

/**
 * Get All Categories
 */
router.get("/", async (req, res) => {
  try {
    const categories = await getAllCategoriesService();
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

/**
 * Get Category by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryByIdService(Number(id));

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

/**
 * Create Category
 */
router.post("/", async (req, res) => {
  try {
    const validatedData = insertCategoryValidator.parse(req.body);
    const category = await createCategoryService(validatedData);

    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.errors || error.message,
    });
  }
});

/**
 * Update Category
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const partialValidator = insertCategoryValidator.partial();
    const validatedData = partialValidator.parse(req.body);

    const updatedCategory = await updateCategoryService(Number(id), validatedData);

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.errors || error.message,
    });
  }
});

/**
 * Delete Category
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCategoryService(Number(id));

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

export default router;