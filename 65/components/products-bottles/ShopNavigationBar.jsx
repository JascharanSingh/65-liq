import React from 'react';

const ShopNavigationBar = ({ onNavigate, activeSection = 'Shop' }) => {
  const sections = ['Shop', 'Best Sellers', 'Trending', 'On Sale', 'New Arrivals'];

  return (
    <div className="shop-nav d-flex flex-column mb-4">
      <style>{`
        .shop-nav button {
          transition: all 0.2s ease-in-out;
          border-left: 4px solid transparent;
          border-radius: 0;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
        }

        .shop-nav button:hover {
          background-color: #f9f9f9;
          color: #111;
        }

        .shop-nav .active-btn {
          background-color: #f3f4f6;
          color: #E97451;
          border-left: 4px solid #E97451;
        }
      `}</style>

      {sections.map((section) => (
        <button
          key={section}
          className={`text-start btn py-2 px-3 fw-medium ${
            activeSection === section ? 'active-btn' : 'text-secondary'
          }`}
          onClick={() => onNavigate(section)}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default ShopNavigationBar;