import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaStore } from "react-icons/fa"; // FaBars and FaTimes removed
import { useCart } from "../context/CartContext";
import "./Header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { cartItems, setShowCart } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // menuOpen state removed as burger menu is no longer used
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchValue.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:4000/api/products/search?query=${searchValue}`
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setSuggestions(data.slice(0, 5));
        setShowSuggestions(true);
      } catch (err) {
        console.error("❌ Suggestion fetch failed:", err.message);
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
      setSearchValue(""); // Clear search value after submitting
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productName) => {
    navigate(`/search?query=${encodeURIComponent(productName)}`);
    setSearchValue(productName);
    setShowSuggestions(false);
  };

  return (
    <>
      <div
        className={`glass-navbar d-flex align-items-center justify-content-between flex-wrap py-2 px-4 ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        {/* Logo */}
        <div className="d-flex align-items-center flex-shrink-0">
          <img
            src={scrolled ? "/images/LOGO-dark.png" : "/images/LOGO.png"}
            alt="65 Liquor Store Logo"
            className="img-fluid"
            // Smaller logo
            style={{
              maxHeight: "60px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
            onError={(e) => {
              e.target.src = "/images/LOGO.png";
            }}
          />
        </div>

        {/* Search Bar with Suggestions - Visible on both desktop and mobile */}
        <div className="flex-grow-1 mx-3 position-relative header-search-bar">
          {" "}
          {/* Added header-search-bar class */}
          <form onSubmit={handleSearchSubmit}>
            <div className="input-group input-group-sm">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Seach for products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                aria-label="Search products"
              />
              <button
                className="btn btn-sienna px-3"
                type="submit"
                style={{ fontSize: "0.875rem" }}
                aria-label="Search"
              >
                Search
              </button>
            </div>
          </form>
          {/* Suggestions Dropdown */}
          {Array.isArray(suggestions) &&
            suggestions.length > 0 &&
            showSuggestions && (
              <ul
                className="list-group position-absolute w-100 mt-1 shadow"
                style={{ zIndex: 1050 }}
              >
                {suggestions.map((product) => (
                  <li
                    key={product._id}
                    className="list-group-item list-group-item-action"
                    onMouseDown={() => handleSuggestionClick(product.name)}
                    style={{ fontSize: "0.875rem", cursor: "pointer" }}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
        </div>

        {/* Pickup Info & Cart Icon - Combined for simplified layout */}
        <div className="d-flex align-items-center gap-3 flex-shrink-0 header-right-icons">
          {" "}
          {/* Added header-right-icons class */}
          {/* Pickup Info - Visible only on desktop */}
          <div
            className={`d-none d-md-flex align-items-center ${
              scrolled ? "text-dark" : "text-white"
            }`}
            style={{ transition: "color 0.3s ease" }}
          >
            <FaStore className="me-2" />
            <div style={{ fontSize: "0.875rem" }}>
              <small className="d-block">Pickup at</small>
              <strong>Middle Village, NY</strong>
            </div>
          </div>
          {/* Cart Icon - Visible on both desktop and mobile */}
          <div
            className="position-relative" // Removed flex-shrink-0 as it's now part of header-right-icons
            style={{ cursor: "pointer" }}
            onClick={handleCartClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCartClick();
            }}
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <FaShoppingCart
              className={`${scrolled ? "text-dark" : "text-white"}`}
              size={20}
              style={{ transition: "color 0.3s ease" }}
            />
            {cartCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{
                  backgroundColor: "#E97451",
                  fontSize: "0.7rem",
                  padding: "0.3rem 0.5rem",
                  minWidth: "1.5rem",
                  height: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <header
        className="position-relative overflow-hidden hero-section"
        style={{ height: "100vh" }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <img
            src="/images/header-img.jpg"
            alt="Premium whiskey and spirits collection"
            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover hero-background-image"
            style={{ zIndex: -2 }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.3))",
              zIndex: -1,
            }}
          />
        </div>

        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <div className="d-flex flex-column align-items-center gap-3">
            {/* Banner Text */}
            <div className="glass-banner text-center p-4 px-5">
              <h1 className="glass-text mb-2">Premium Collection</h1>
              <p className="glass-subtext mb-0">
                Finest Spirits Handpicked for Connoisseurs
              </p>
            </div>

            {/* Shop Now Button */}
            <a href="#shop-section" className="shop-now-btn" role="button">
              Shop Now
            </a>

            {/* Logos under Shop Now */}
            <div className="glass-logo-box d-flex align-items-center justify-content-center gap-3 mt-2 px-4 py-2">
              <a
                href="https://www.ubereats.com/store/65-st-wine-%26-liquor/_PLsXTmxWBGj_NAlyyN1Vg?srsltid=AfmBOoprXQO19p1HJwTCS9LaYmMXUnMkK2JKY49ngGPB42nlsZjX1C34"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on Uber Eats"
              >
                <img
                  src="/images/Uber_Eats.png"
                  alt="Order on Uber Eats"
                  className="order-logo"
                  style={{ height: "60px", objectFit: "contain" }}
                />
              </a>
              <a
                href="https://www.doordash.com/convenience/store/27647523"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on DoorDash"
              >
                <img
                  src="/images/doordash.svg"
                  alt="Order on DoorDash"
                  className="order-logo"
                  style={{ height: "20px", objectFit: "contain" }}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-bottom-blur"></div>
      </header>
    </>
  );
};

export default Header;
