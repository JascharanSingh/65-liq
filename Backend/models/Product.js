const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  tagline: { type: String, trim: true },
  description: { type: String, trim: true },
  volume: { type: String, trim: true },
  alcoholPercent: { type: String, trim: true },
  actualPrice: { type: String, trim: true },
  discount: { type: String, trim: true },
  price: { type: String, required: true, trim: true },
  stock: { type: String, trim: true },
  category: { type: String, default: 'Uncategorized', trim: true },
  subcategory: { type: String, default: 'Other', trim: true },
  origin: { type: String, trim: true },
  brand: { type: String, trim: true },
  image: { type: String, trim: true },
  onSale: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', ProductSchema);