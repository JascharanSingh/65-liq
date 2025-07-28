// src/components/Header.jsx
import React from "react";
import { FaShoppingCart, FaStore } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white py-2 border-bottom shadow-sm">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Store name */}
        <h5 className="mb-0 fw-bold">65 Liquor Store</h5>

        {/* Search bar */}
        <div className="flex-grow-1 mx-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="What can we help you find today?"
            />
            <button className="btn btn-success">Search</button>
          </div>
        </div>

        {/* Store pickup info */}
        <div className="d-none d-md-flex align-items-center me-3">
          <FaStore className="me-2" />
          <div>
            <small className="text-muted d-block">Pickup at</small>
            <strong>Westbury, NY</strong>
          </div>
        </div>

        {/* Cart icon */}
        <FaShoppingCart size={20} />
      </div>
    </header>
  );
};

export default Header;