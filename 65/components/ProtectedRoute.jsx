import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// ✅ Use environment variable for backend URL
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/admin/verify`, {
          method: "GET",
          credentials: "include", // ✅ Required for cookies
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        const isAdmin = data?.user?.role === "admin" || data?.role === "admin";

        setIsAuthenticated(isAdmin);
      } catch (err) {
        console.warn("Redirecting to login:", err.message);
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    verifyAdmin();
  }, []);

  if (checking)
    return <div className="text-center py-10">🔐 Verifying access...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
