// routes/adminAuth.js
const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  logoutAdmin,
  verifyAdmin,
} = require("../controllers/adminController");

const { authenticate } = require("../middleware/auth");

// ✅ Admin login
router.post("/login", loginAdmin);

// ✅ Verify token & user identity
router.get("/verify", authenticate, verifyAdmin);

// ✅ Logout admin (clears cookie)
router.post("/logout", logoutAdmin);

// 📌 Future enhancements (optional):
// router.post("/register", registerAdmin);
// router.post("/refresh-token", refreshAccessToken);

module.exports = router;