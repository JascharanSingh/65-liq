// src/components/Header.jsx
import React from "react";
import { FaShoppingCart, FaStore } from "react-icons/fa";

const Header = () => {
  return (
    <header className="position-relative">
      {/* Background image section */}
      <div className="header-image-wrapper">
        <img
          src="/images/header-img.jpg"
          alt="Whiskey Bottles"
          className="img-fluid w-100 header-img"
        />
      </div>

      {/* Glass-style navbar on top of image */}
      <div className="glass-navbar container d-flex align-items-center justify-content-between flex-wrap gap-3 py-2 px-4">
        {/* Store logo image */}
        <img
          src="/images/LOGO.png"
          alt="65 Liquor Store Logo"
          className="img-fluid"
          style={{ maxHeight: "70px", objectFit: "contain" }}
        />

        {/* Search bar with blur */}
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

        {/* Store pickup info */}
        <div className="d-none d-md-flex align-items-center me-3 text-white">
          <FaStore className="me-2" />
          <div style={{ fontSize: "0.875rem" }}>
            <small className="d-block">Pickup at</small>
            <strong>Westbury, NY</strong>
          </div>
        </div>

        {/* Cart icon */}
        <FaShoppingCart className="text-white" size={18} />
      </div>
    </header>
  );
};

export default Header;