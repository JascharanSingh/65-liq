const Product = require("../models/Product");

// ✅ GET all products (with pagination & optional category filter)
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.category) {
      filter.category = { $regex: new RegExp(`^${req.query.category}$`, "i") };
    }

    const products = await Product.find(filter).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);

    res.json({ products, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("❌ Error in getAllProducts:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ CREATE product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      image,
      category,
      subcategory,
      onSale,
      brand,
      volume,
      alcoholPercent,
      stock,
      origin,
      tagline,
      bestSeller,
      trending,
      newArrival,
    } = req.body;

    if (!name || !price || !image || !category) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newProduct = new Product({
      name: name.trim(),
      price: price,
      description: description?.trim(),
      image,
      category: category.trim(),
      subcategory: subcategory?.trim(),
      onSale: !!onSale,
      brand: brand?.trim(),
      volume: volume?.trim(),
      alcoholPercent: alcoholPercent?.trim(),
      stock: stock?.trim(),
      origin: origin?.trim(),
      tagline: tagline?.trim(),
      bestSeller: !!bestSeller,
      trending: !!trending,
      newArrival: !!newArrival,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Error in createProduct:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    const update = {
      name: req.body.name?.trim(),
      price: req.body.price,
      description: req.body.description?.trim(),
      image: req.body.image,
      category: req.body.category?.trim(),
      subcategory: req.body.subcategory?.trim(),
      onSale: !!req.body.onSale,
      brand: req.body.brand?.trim(),
      volume: req.body.volume?.trim(),
      alcoholPercent: req.body.alcoholPercent?.trim(),
      stock: req.body.stock?.trim(),
      origin: req.body.origin?.trim(),
      tagline: req.body.tagline?.trim(),
      bestSeller: !!req.body.bestSeller,
      trending: !!req.body.trending,
      newArrival: !!req.body.newArrival,
    };

    const updated = await Product.findByIdAndUpdate(req.params.id, update, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Error in updateProduct:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("❌ Error in deleteProduct:", err);
    res.status(500).json({ message: "Server error" });
  }
};