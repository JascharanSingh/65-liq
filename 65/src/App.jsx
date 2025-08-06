import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PromoBanner from "../components/PromoBanner"
import Header from "../components/Header";
import Footer from "../components/Footer";
import WineAndSpirits from "../components/WineAndSpirits";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Store from "./pages/Store";
import Wedding from "./pages/Weddings";
import { CartProvider } from "../context/CartContext";
import CartSidebar from "../components/products-bottles/CartSidebar";
import EventsSection from "../components/EventsSection";  
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>

          {/* 🔐 Protected Admin Route */}
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

          {/* ------------------- Legal ------------------- */}
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

          {/* ------------------- About ------------------- */}
          <Route
            path="/contact"
            element={
              <div className="d-flex flex-column min-vh-100">
                <Contact />
              </div>
            }
          />

          {/* ------------------- Store Info ------------------- */}
          <Route
            path="/store"
            element={
              <div className="d-flex flex-column min-vh-100">
                <Store />
              </div>
            }
          />
          <Route path="/weddings" element={<Wedding />} />

          {/* ------------------- Default (Home) ------------------- */}
          <Route
            path="*"
            element={
              <div className="d-flex flex-column min-vh-100">
                <div className="flex-grow-1 position-relative">
                  <Header />
                  <div>
      <PromoBanner />
    </div>
                  <WineAndSpirits />
                  <CartSidebar />
                </div>
              <EventsSection/>
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