// routes/imagekit.js
const express = require("express");
const router = express.Router();
const ImageKit = require("imagekit");
require("dotenv").config();

// ✅ Ensure keys are available
if (
  !process.env.IMAGEKIT_PUBLIC_KEY ||
  !process.env.IMAGEKIT_PRIVATE_KEY ||
  !process.env.IMAGEKIT_URL_ENDPOINT
) {
  console.error("❌ Missing ImageKit environment variables.");
  process.exit(1);
}

// ✅ Initialize ImageKit instance
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// ✅ Generate ImageKit upload auth parameters
router.get("/auth", (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.json(authParams);
  } catch (err) {
    console.error("❌ ImageKit Auth Error:", err);
    res.status(500).json({ error: "Failed to generate auth parameters" });
  }
});

// 📌 You can later add: router.post('/upload', ...) to support direct upload APIs

module.exports = router;