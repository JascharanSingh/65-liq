import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaStore,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartSidebar from "./products-bottles/CartSidebar";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const { cartItems, setShowCart } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchValue.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get(
          `${backendUrl}/api/products/search?query=${searchValue}`
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setSuggestions(data.slice(0, 5));
        setShowSuggestions(true);
      } catch (err) {
        setSuggestions([]);
      }
    };
    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchValue]);

  const handleCartClick = () => setShowCart(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchValue)}`);
      setShowSuggestions(false);
      setSearchFocused(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSuggestionClick = (productName) => {
    navigate(`/search?query=${encodeURIComponent(productName)}`);
    setSearchValue(productName);
    setShowSuggestions(false);
    setSearchFocused(false);
    setIsMobileMenuOpen(false);
  };

  // Mobile menu open/close toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setShowSuggestions(false);
  };

  return (
    <>
      <style>
        {`
      .search-input::placeholder {
        color: #bca148 !important;
        opacity: 1 !important;
        font-weight: 500;
      }
    `}
      </style>
      <nav className="modern-navbar fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="navbar-container max-w-7xl mx-auto px-4 flex items-center justify-between h-20 relative">
          {/* Logo Section */}
          <a href="/" className="logo-section flex-shrink-0 block">
            <div className="logo-wrapper flex items-center relative">
              <img
                src="/images/logo4.png"
                alt="65 Wine & Liquor"
                className="logo-image h-12 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/65st.png";
                }}
              />
            </div>
          </a>

          {/* Desktop Search */}
          <div className="search-section desktop-search hidden md:flex flex-1 max-w-xl mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="search-form w-full">
              <div className={`search-container flex items-center w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm px-3 py-2 ${searchFocused ? "ring-2 ring-amber-500" : ""}`}>
                <FaSearch className="search-icon text-gray-400 mr-2" />
                <input
                  type="text"
                  className="search-input flex-1 bg-transparent border-0 text-gray-900 placeholder-gray-500 focus:outline-none"
                  placeholder="Search premium spirits..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => {
                    setSearchFocused(true);
                    setShowSuggestions(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowSuggestions(false);
                      setSearchFocused(false);
                    }, 200);
                  }}
                  style={{
                    pointerEvents: "auto",       // <-- fixes most issues
                    background: "transparent",
                    color: "#222",
                    fontWeight: 500
                  }}
                />
                <button
                  type="submit"
                  className="search-btn px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md"
                >
                  Search
                </button>
              </div>

              {/* Suggestions */}
              {Array.isArray(suggestions) &&
                suggestions.length > 0 &&
                showSuggestions && (
                  <div className="suggestions-dropdown absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {suggestions.map((product, index) => (
                      <div
                        key={product._id}
                        className="suggestion-item flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        onMouseDown={() => handleSuggestionClick(product.name)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <FaSearch className="suggestion-icon mr-2 text-gray-400" />
                        <span>{product.name}</span>
                      </div>
                    ))}
                  </div>
                )}
            </form>
          </div>

          {/* Desktop Right */}
          <div className="nav-right hidden md:flex items-center space-x-8">
            {/* Pickup Info */}
            <div className="pickup-info flex items-center text-gray-700">
              <FaStore className="pickup-icon w-4 h-4 mr-2 text-gray-500" />
              <div className="pickup-text text-sm">
                <div className="pickup-label text-xs text-gray-400">Pickup at</div>
                <a
                  href="https://www.google.com/maps/place/65+St+Wine+%26+Liquor/@40.7123443,-73.8960677,17z/data=!4m6!3m5!1s0x89c25f57ca3f0825:0x3e28bf19985b5d7a!8m2!3d40.7123443!4d-73.8960677!16s%2Fg%2F11y2j_cznk?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
                  className="pickup-location font-semibold text-gray-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Middle Village, NY
                </a>
              </div>
            </div>
            {/* Cart Button */}
            <button
              className="cart-button relative p-2 text-gray-700 hover:text-amber-600"
              onClick={handleCartClick}
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <FaShoppingCart className="cart-icon w-6 h-6" />
              {cartCount > 0 && (
                <span className="cart-badge absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center space-x-4">
            <button onClick={handleCartClick} className="relative p-2 text-gray-700">
              <FaShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-4 h-4 flex items-center justify-center px-1">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
            <button onClick={toggleMobileMenu} className="p-2 text-gray-700">
              {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="search-form relative mb-2">
                <div className={`search-container flex items-center bg-gray-50 border border-gray-300 rounded-lg shadow-sm px-2 py-1 ${searchFocused ? "ring-2 ring-amber-500" : ""}`}>
                  <FaSearch className="search-icon text-gray-400 mr-2" />
                  <input
                    type="text"
                    className="search-input flex-1 bg-transparent border-0 text-gray-900 placeholder-gray-500"
                    placeholder="Search premium spirits..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => {
                      setSearchFocused(true);
                      setShowSuggestions(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setShowSuggestions(false);
                        setSearchFocused(false);
                      }, 200);
                    }}
                  />
                  <button
                    type="submit"
                    className="search-btn px-4 py-2 bg-amber-600 text-white font-medium rounded-md ml-2"
                  >
                    Search
                  </button>
                </div>
                {/* Suggestions */}
                {Array.isArray(suggestions) &&
                  suggestions.length > 0 &&
                  showSuggestions && (
                    <div className="suggestions-dropdown absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      {suggestions.map((product, index) => (
                        <div
                          key={product._id}
                          className="suggestion-item flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                          onMouseDown={() => handleSuggestionClick(product.name)}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <FaSearch className="suggestion-icon mr-2 text-gray-400" />
                          <span>{product.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
              </form>

              {/* Mobile Pickup Info */}
              <div className="pickup-info flex items-center text-gray-700">
                <FaStore className="pickup-icon w-4 h-4 mr-3 text-gray-500" />
                <div className="pickup-text text-sm">
                  <div className="pickup-label text-xs text-gray-400">Pickup at</div>
                  <a
                    href="https://www.google.com/maps/place/65+St+Wine+%26+Liquor/@40.7123443,-73.8960677,17z/data=!4m6!3m5!1s0x89c25f57ca3f0825:0x3e28bf19985b5d7a!8m2!3d40.7123443!4d-73.8960677!16s%2Fg%2F11y2j_cznk?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
                    className="pickup-location font-semibold text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Middle Village, NY
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
      <CartSidebar />
    </>
  );
};

export default Navbar;