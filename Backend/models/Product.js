const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true, trim: true },
    tagline: { type: String, trim: true },
    description: { type: String, trim: true },

    // Product Details
    volume: { type: String, trim: true },
    alcoholPercent: { type: String, trim: true },
    origin: { type: String, trim: true },
    brand: { type: String, trim: true },

    // Pricing
    actualPrice: { type: String, trim: true }, // Optional original price
    discount: { type: String, trim: true },     // Optional discount %
    price: { type: String, required: true, trim: true },
    stock: { type: String, trim: true },

    // Categorization
    category: { type: String, default: "Uncategorized", trim: true },
    subcategory: { type: String, default: "Other", trim: true },

    // Image
    image: { type: String, trim: true },

    // Flags
    onSale: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);