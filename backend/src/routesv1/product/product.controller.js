import express from "express";
import { insertProductValidator } from "../../db/schemas/product.js";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "./product.service.js";

const router = express.Router();

/**
 * Get All Products
 */
router.get("/", async (req, res) => {
  try {
    const products = await getAllProductsService();
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

/**
 * Get Product by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(Number(id));

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

/**
 * Create Product
 */
router.post("/", async (req, res) => {
  try {
    const validatedData = insertProductValidator.parse(req.body);
    const product = await createProductService(validatedData);

    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.errors || error.message,
    });
  }
});

/**
 * Update Product
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const partialValidator = insertProductValidator.partial();
    const validatedData = partialValidator.parse(req.body);

    const updatedProduct = await updateProductService(Number(id), validatedData);

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.errors || error.message,
    });
  }
});

/**
 * Delete Product
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProductService(Number(id));

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
});

export default router;