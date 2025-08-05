const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

 
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const Product = require('../models/Product');

// ✅ Import auth middleware
const { authenticate, authorize } = require('../middleware/auth');

// ✅ Inline Category model
const Category = mongoose.model(
  'Category',
  new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    subcategories: { type: [String], default: [] },
  }),
  'categories' // explicitly use 'categories' collection
);

// ✅ GET all products (public)
router.get('/', getAllProducts);

// ✅ GET products by category (case-insensitive, public)
router.get('/category/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const products = await Product.find({
      category: { $regex: new RegExp(`^${name}$`, 'i') },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET all categories (public)
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error('❌ Failed to fetch categories:', err.message);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// ✅ CREATE a product (admin-only)
router.post('/', authenticate, authorize(['admin']), createProduct);

// ✅ UPDATE a product by ID (admin-only)
router.put('/:id', authenticate, authorize(['admin']), updateProduct);

// ✅ DELETE a product by ID (admin-only)
router.delete('/:id', authenticate, authorize(['admin']), deleteProduct);

module.exports = router;
