import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Use .env-based backend URL
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/admin/verify`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        if (data?.user?.role === "admin" || data?.role === "admin") {
          setAllowed(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (err) {
        console.warn("Redirecting to login:", err.message);
        navigate("/login");
      } finally {
        setChecking(false);
      }
    };

    verify();
  }, [navigate]);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        🔐 Verifying admin access...
      </div>
    );
  }

  return allowed ? children : null;
}
