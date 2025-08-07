// index.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// ✅ Environment Variable Check
[
  "MONGO_URI",
  "JWT_SECRET",
  "IMAGEKIT_PUBLIC_KEY",
  "IMAGEKIT_PRIVATE_KEY",
  "IMAGEKIT_URL_ENDPOINT",
].forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// ✅ CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json());            // Built-in JSON parser
app.use(cookieParser());            // Cookie parser
app.use(helmet());                  // Secure headers

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ✅ Routes
const adminRoutes = require("./routes/adminAuth");
const productRoutes = require("./routes/productRoutes");
const imagekitRoutes = require("./routes/imagekit");

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/imagekit", imagekitRoutes);

// ✅ Health Check
app.get("/api/ping", (req, res) => {
  res.send("pong");
});

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});