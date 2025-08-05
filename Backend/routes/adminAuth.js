// routes/adminAuth.js
const express = require("express");
const router = express.Router();
const { loginAdmin, logoutAdmin } = require("../controllers/adminController");
const { authenticate } = require("../middleware/auth");

router.post("/login", loginAdmin);

router.get("/verify", authenticate, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});

router.post("/logout", logoutAdmin);

module.exports = router;