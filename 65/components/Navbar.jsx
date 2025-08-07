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
        setSuggestions(res.data.slice(0, 5));
        setShowSuggestions(true);
      } catch (err) {
        console.error("❌ Failed to fetch suggestions:", err.message);
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
    }
  };

  const handleSuggestionClick = (productName) => {
    navigate(`/search?query=${encodeURIComponent(productName)}`);
    setSearchValue(productName);
    setShowSuggestions(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex-shrink-0 block">
              <img
                src="/images/LOGO-dark.png"
                alt="65 Liquor Store"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.src = "/images/LOGO.png";
                }}
              />
            </a>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
              <div className="flex w-full bg-gray-50 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 bg-transparent border-0 text-gray-900 placeholder-gray-500 focus:outline-none"
                  placeholder="What can we help you find today?"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <button
                  onClick={handleSearchSubmit}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium"
                >
                  Search
                </button>
              </div>

              {suggestions.length > 0 && showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  {suggestions.map((product) => (
                    <div
                      key={product._id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 text-sm"
                      onMouseDown={() => handleSuggestionClick(product.name)}
                    >
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center text-gray-700">
                <FaStore className="w-4 h-4 mr-2 text-gray-500" />
                <div className="text-sm">
                  <div className="text-xs text-gray-400">Pickup at</div>
                  <div className="font-semibold text-gray-900">Westbury, NY</div>
                </div>
              </div>

              <button
                onClick={handleCartClick}
                className="relative p-2 text-gray-700 hover:text-amber-600"
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <FaShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
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
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <div className="flex bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    className="flex-1 px-4 py-3 bg-transparent border-0 text-gray-900 placeholder-gray-500"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                  <button onClick={handleSearchSubmit} className="px-6 py-3 bg-amber-600 text-white">
                    Search
                  </button>
                </div>

                {suggestions.length > 0 && showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {suggestions.map((product) => (
                      <div
                        key={product._id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 text-sm"
                        onMouseDown={() => handleSuggestionClick(product.name)}
                      >
                        {product.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Store Info */}
              <div className="flex items-center text-gray-700 py-2">
                <FaStore className="w-4 h-4 mr-3 text-gray-500" />
                <div className="text-sm">
                  <div className="text-xs text-gray-400">Pickup at</div>
                  <div className="font-semibold text-gray-900">Westbury, NY</div>
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