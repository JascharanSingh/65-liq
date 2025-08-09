// index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();

/* ---------------------- Env sanity checks ---------------------- */
[
  "MONGO_URI",
  "JWT_SECRET",
  "IMAGEKIT_PUBLIC_KEY",
  "IMAGEKIT_PRIVATE_KEY",
  "IMAGEKIT_URL_ENDPOINT",
  // Optional:
  // "FRONTEND_URLS", "FRONTEND_URL"
].forEach((key) => {
  if (!process.env[key]) console.warn(`ℹ️ Missing environment variable: ${key}`);
});

/* ---------------------- CORS (prod + dev) ---------------------- */
/**
 * Set FRONTEND_URLS on Render if you want to manage origins via env:
 * e.g. FRONTEND_URLS=https://frontend-wp97.onrender.com
 */
const envOrigins =
  (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

// Always allow local dev in non-prod
if (process.env.NODE_ENV !== "production") {
  envOrigins.push("http://localhost:5173", "http://localhost:4173");
}

// Fallback to your deployed frontend if none provided
if (envOrigins.length === 0) {
  envOrigins.push("https://frontend-wp97.onrender.com");
}

const allowedOrigins = Array.from(new Set(envOrigins)); // de-dup

const corsOptions = {
  origin(origin, cb) {
    // Allow requests without Origin (e.g., curl, cron, server-to-server)
    if (!origin) return cb(null, true);
    return cb(null, allowedOrigins.includes(origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS to all routes and explicitly handle preflights
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* ---------------------- Proxies & security ---------------------- */
// Needed so cookies with Secure/SameSite=None behave correctly behind Render's proxy
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

/* ---------------------- Middlewares ---------------------- */
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // If you later enable CSP, remember to allow ImageKit domains

/* ---------------------- MongoDB ---------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* ---------------------- Routes ---------------------- */
const adminRoutes = require("./routes/adminAuth");
const productRoutes = require("./routes/productRoutes");
const imagekitRoutes = require("./routes/imagekit");

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/imagekit", imagekitRoutes);

// Health check
app.get("/api/ping", (_req, res) => res.send("pong"));

/* ---------------------- Server ---------------------- */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Allowed CORS origins:", allowedOrigins);
  console.log(`🚀 Server running on port ${PORT}`);
});