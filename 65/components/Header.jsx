import React from "react";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <header className="position-relative vh-100 overflow-hidden">
      {/* Background image */}
      <img
        src="/images/header-img.avif"
        alt="Whiskey Bottles"
        loading="lazy"
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover z-n1"
      />

      {/* Glass-style navbar */}
      <div className="glass-navbar container d-flex align-items-center justify-content-between flex-wrap gap-3 py-2 px-4 position-relative">
        {/* Logo */}
        <img
          src="/images/LOGO.png"
          alt="65 Liquor Store Logo"
          className="img-fluid"
          style={{
            maxHeight: "70px",
            objectFit: "contain",
          }}
        />

        {/* Search bar */}
        <div className="flex-grow-1 mx-3">
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control search-input text-white"
              placeholder="What can we help you find today?"
            />
            <button className="btn btn-sienna px-3">Search</button>
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

        {/* Cart Icon */}
        <FaShoppingCart className="text-white" size={18} />
      </div>
    </header>
  );
};

export default Header;