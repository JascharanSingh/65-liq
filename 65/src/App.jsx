import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import WineAndSpirits from "../components/WineAndSpirits";
import Admin from "./pages/Admin";
import { CartProvider } from "../context/CartContext";
import CartSidebar from "../components/products-bottles/CartSidebar"; // ✅ fixed path

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="*"
            element={
              <div className="d-flex flex-column min-vh-100">
                <div className="flex-grow-1 position-relative">
                  <Header />
                  <WineAndSpirits />
                  <CartSidebar /> {/* ✅ works now */}
                </div>
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