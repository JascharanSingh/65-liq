import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧩 Components
import PromoBanner from "../components/PromoBanner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WineAndSpirits from "../components/WineAndSpirits";
import CartSidebar from "../components/products-bottles/CartSidebar";
import EventsSection from "../components/EventsSection";
import ProtectedRoute from "../components/ProtectedRoute";

// 🛍 Pages
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Store from "./pages/Store";
import Wedding from "./pages/Weddings";

// 🛒 Context
import { CartProvider } from "../context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* 🔐 Admin Panel (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* 🔑 Admin Login */}
          <Route path="/login" element={<Login />} />

          {/* 📄 Legal Pages */}
          <Route
            path="/privacy-policy"
            element={
              <div className="d-flex flex-column min-vh-100">
                <PrivacyPolicy />
              </div>
            }
          />
          <Route
            path="/terms"
            element={
              <div className="d-flex flex-column min-vh-100">
                <Terms />
              </div>
            }
          />

          {/* 📞 Contact / Info */}
          <Route
            path="/contact"
            element={
              <div className="d-flex flex-column min-vh-100">
                <Contact />
              </div>
            }
          />
          <Route
            path="/store"
            element={
              <div className="d-flex flex-column min-vh-100">
                <Store />
              </div>
            }
          />
          <Route path="/weddings" element={<Wedding />} />

          {/* 🏠 Main Homepage & Shop */}
          <Route
            path="*"
            element={
              <div className="d-flex flex-column min-vh-100">
                <div className="flex-grow-1 position-relative">
                  <Header />
                  <PromoBanner />
                  <WineAndSpirits />
                  <CartSidebar />
                </div>
                <EventsSection />
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;