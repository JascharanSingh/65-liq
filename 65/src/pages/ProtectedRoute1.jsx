// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/admin/verify", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        if (data?.user?.role === "admin") {
          setAllowed(true);
        } else {
          navigate("/login");
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
      <div className="flex justify-center items-center h-screen">
        🔐 Checking access...
      </div>
    );
  }

  return allowed ? children : null;
}