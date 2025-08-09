// controllers/adminController.js
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ONE_HOUR_MS = 60 * 60 * 1000;

// Helpers
const signToken = (admin) =>
  jwt.sign(
    { id: admin._id.toString(), role: admin.role, email: admin.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
      issuer: "baveda-auth",
      audience: "baveda-admin",
    }
  );

const cookieOptions = () => {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,        // Render = HTTPS → true in prod
    sameSite: isProd ? "None" : "Lax", // cross-site needs None in prod
    maxAge: ONE_HOUR_MS,
    path: "/",             // be explicit
  };
};

// POST /api/admin/login
exports.loginAdmin = async (req, res) => {
  try {
    let { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    email = String(email).toLowerCase().trim();
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(admin);
    const opts = cookieOptions();

    // Clear & set with same options to avoid duplicates
    res.clearCookie("token", { path: "/", sameSite: opts.sameSite, secure: opts.secure });
    res.cookie("token", token, opts);

    const expiresAt = Date.now() + ONE_HOUR_MS;

    return res.status(200).json({
      message: "Login successful",
      user: { id: admin._id, email: admin.email, role: admin.role },
      expiresAt,
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/verify
exports.verifyAdmin = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "baveda-auth",
      audience: "baveda-admin",
    });

    // You could re-fetch admin if you need fresh role/email; here we trust the token
    return res.status(200).json({ user: decoded });
  } catch (err) {
    console.error("❌ Verify Error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// POST /api/admin/logout
exports.logoutAdmin = async (req, res) => {
  try {
    const opts = cookieOptions();
    // Clear with same attributes to ensure removal in all browsers
    res.clearCookie("token", { path: "/", sameSite: opts.sameSite, secure: opts.secure });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("❌ Logout Error:", err);
    return res.status(500).json({ message: "Logout failed" });
  }
};