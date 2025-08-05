import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/admin/verify", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");
        setIsAuthenticated(true);
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
