// src/components/Header.jsx
import React from "react";
import { FaShoppingCart, FaStore } from "react-icons/fa";

const Header = () => {
  return (
    <header className="position-relative">
      {/* Background image section */}
      <div className="header-image-wrapper">
        <img
          src="/header-img.jpg"
          alt="Whiskey Bottles"
          className="img-fluid w-100 header-img"
        />
      </div>

      {/* Glass-style navbar on top of image */}
      <div className="glass-navbar container d-flex align-items-center justify-content-between flex-wrap gap-3 py-3 px-4">
        {/* Store name */}
        <h5 className="mb-0 fw-bold store-title text-white">65 Liquor Store</h5>

        {/* Search bar */}
        <div className="flex-grow-1 mx-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="What can we help you find today?"
            />
            <button className="btn btn-sienna">Search</button>
          </div>
        </div>

        {/* Store pickup info */}
        <div className="d-none d-md-flex align-items-center me-3 text-white">
          <FaStore className="me-2" />
          <div>
            <small className="d-block">Pickup at</small>
            <strong>Westbury, NY</strong>
          </div>
        </div>

        {/* Cart icon */}
        <FaShoppingCart className="text-white" size={20} />
      </div>
    </header>
  );
};

export default Header;