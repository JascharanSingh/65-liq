// src/pages/ShopNavigationBar.jsx
import React from 'react';

const ShopNavigationBar = ({ onNavigate }) => {
  const sections = ['Shop', 'Best Sellers', 'Trending', 'On Sale', 'New Arrivals'];

  return (
    <div className="shop-nav d-flex flex-column mb-4">
      {sections.map((section) => (
        <button
          key={section}
          className="text-start btn btn-light border-bottom py-2 px-3 text-dark fw-semibold"
          onClick={() => onNavigate(section)}
          style={{ background: section === 'Shop' ? '#eee' : 'transparent' }}
        >
          <i className="bi bi-shop me-2"></i> {section}
        </button>
      ))}
    </div>
  );
};

export default ShopNavigationBar;