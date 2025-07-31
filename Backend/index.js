const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const imagekitRoutes = require("./routes/imagekit");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// ✅ Register Category model safely (only if not already defined)
if (!mongoose.models.Category) {
  mongoose.model(
    "Category",
    new mongoose.Schema({
      name: { type: String, required: true },
      subcategories: { type: [String], default: [] },
    }),
    "categories" // collection name in MongoDB
  );
}

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/imagekit", imagekitRoutes);

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});