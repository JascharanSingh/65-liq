const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const Product = require('../models/Product');
const mongoose = require('mongoose');

// ✅ Temporary inline Category model
const Category = mongoose.model(
  'Category',
  new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    subcategories: { type: [String], default: [] },
  }),
  'categories' // explicitly use 'categories' collection
);

// ✅ GET all products
router.get('/', getAllProducts);

// ✅ GET products by category (case-insensitive)
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

// ✅ GET all categories (for frontend sidebar)
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    console.error('❌ Failed to fetch categories:', err.message);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// ✅ POST to create a new product
router.post('/', createProduct);

// ✅ PUT to update a product by ID
router.put('/:id', updateProduct);

// ✅ DELETE a product by ID
router.delete('/:id', deleteProduct);

module.exports = router;