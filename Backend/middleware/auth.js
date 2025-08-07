// middleware/auth.js
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.warn("❌ No token received in cookies");
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "baveda-auth",
      audience: "baveda-admin",
    });

    req.user = decoded;
    req.token = token;

    // Optional: log decoded token expiration
    // console.log("🔓 Authenticated user:", decoded);

    next();
  } catch (err) {
    console.error("❌ JWT Verification Error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      console.warn(`🚫 Access denied for user: ${req.user?.role}`);
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};

module.exports = { authenticate, authorize };