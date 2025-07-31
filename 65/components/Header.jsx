import React from "react";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./Header.css";

const Header = () => {
  const { cartItems, setShowCart } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  const handleCartClick = () => {
    setShowCart(true); // Ensure this opens the cart sidebar
  };

  return (
    <header className="position-relative vh-100 overflow-hidden">
      {/* Fullscreen Background */}
      <img
        src="/images/header-img.jpg"
        alt="Whiskey Bottles"
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover z-n1"
      />

      {/* Glass-style navbar */}
      <div className="glass-navbar d-flex align-items-center justify-content-between flex-wrap gap-3 py-2 px-4 position-relative w-100">
        {/* Store logo */}
        <img
          src="/images/LOGO.png"
          alt="65 Liquor Store Logo"
          className="img-fluid"
          style={{ maxHeight: "70px", objectFit: "contain" }}
        />

        {/* Search bar */}
        <div className="flex-grow-1 mx-3">
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control search-input"
              placeholder="What can we help you find today?"
              style={{
                height: "34px",
                fontSize: "0.875rem",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "white",
              }}
            />
            <button
              className="btn btn-sienna px-3"
              style={{ fontSize: "0.875rem" }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Pickup Info */}
        <div className="d-none d-md-flex align-items-center me-3 text-white">
          <FaStore className="me-2" />
          <div style={{ fontSize: "0.875rem" }}>
            <small className="d-block">Pickup at</small>
            <strong>Westbury, NY</strong>
          </div>
        </div>

        {/* Cart Icon with Badge */}
        <div
          className="position-relative"
          style={{ cursor: "pointer" }}
          onClick={handleCartClick}
        >
          <FaShoppingCart className="text-white" size={20} />
          {cartCount > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
              style={{
                backgroundColor: "#E97451",
                fontSize: "0.7rem",
                padding: "0.3rem 0.5rem",
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Shop Now Section */}
      <div className="position-absolute top-50 start-50 translate-middle text-center">
        <div className="d-flex flex-column align-items-center gap-3">
          <div className="glass-banner text-center p-4 px-5">
            <h1 className="glass-text mb-2">Premium Collection</h1>
            <p className="glass-subtext mb-0">
              Finest Spirits Handpicked for Connoisseurs
            </p>
          </div>
          <a href="#shop-section" className="shop-now-btn">
            Shop Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;