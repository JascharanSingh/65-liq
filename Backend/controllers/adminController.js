// controllers/adminController.js
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /api/admin/login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
        issuer: "baveda-auth",
        audience: "baveda-admin",
      }
    );

    // ✅ Send token as secure HttpOnly cookie
    res.clearCookie("token");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/verify
exports.verifyAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "baveda-auth",
      audience: "baveda-admin",
    });

    // Optionally check expiration manually here if needed
    // Optionally log IP/device for audit trail

    res.status(200).json({ user: decoded });
  } catch (err) {
    console.error("❌ Verify Error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// POST /api/admin/logout
exports.logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("❌ Logout Error:", err.message);
    res.status(500).json({ message: "Logout failed" });
  }
};