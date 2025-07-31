// src/pages/ShopNavigationBar.jsx
import React from 'react';

const ShopNavigationBar = ({ onNavigate, activeSection = 'Shop' }) => {
  const sections = ['Shop', 'Best Sellers', 'Trending', 'On Sale', 'New Arrivals'];

  return (
    <div className="shop-nav d-flex flex-column mb-4">
      {sections.map((section) => (
        <button
          key={section}
          className={`text-start btn border-bottom py-2 px-3 fw-semibold ${
            activeSection === section ? 'bg-light text-dark' : 'bg-transparent text-secondary'
          }`}
          onClick={() => onNavigate(section)}
        >
          {section === 'Shop' && <i className="bi bi-shop me-2"></i>}
          {section}
        </button>
      ))}
    </div>
  );
};

export default ShopNavigationBar;