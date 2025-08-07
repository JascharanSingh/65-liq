const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const Product = require("../models/Product"); // ✅ FIXED: Make sure this path is correct
const { authenticate, authorize } = require("../middleware/auth");

// ✅ Inline Category model for "categories" collection
const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    subcategories: { type: [String], default: [] },
  }),
  "categories"
);

// ✅ GET all products (with pagination or filtering)
router.get("/", getAllProducts);

// ✅ GET products by category name (case-insensitive)
router.get("/category/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const safeRegex = new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");

    const products = await Product.find({ category: { $regex: safeRegex } });

    res.json(products);
  } catch (err) {
    console.error("❌ Category fetch error:", err.message);
    res.status(500).json({ error: "Server error while fetching products by category" });
  }
});

// ✅ GET all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error("❌ Failed to fetch categories:", err.message);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// ✅ Create product (admin only)
router.post("/", authenticate, authorize(["admin"]), createProduct);

// ✅ Update product (admin only)
router.put("/:id", authenticate, authorize(["admin"]), updateProduct);

// ✅ Delete product (admin only)
router.delete("/:id", authenticate, authorize(["admin"]), deleteProduct);

module.exports = router;