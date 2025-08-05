// middleware/auth.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("❌ No token received in cookies");
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔓 Decoded JWT:", decoded);

    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    console.error("❌ JWT error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ✅ This function must be defined and exported
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};

module.exports = { authenticate, authorize }; // ✅ Make sure this is correct
