import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaStore, FaSearch } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./Header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Header = () => {
  const { cartItems, setShowCart } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
          `${backendUrl}/api/products/search?query=${searchValue}`
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
      setSearchValue("");
      setShowSuggestions(false);
      setSearchFocused(false);
    }
  };

  const handleSuggestionClick = (productName) => {
    navigate(`/search?query=${encodeURIComponent(productName)}`);
    setSearchValue(productName);
    setShowSuggestions(false);
    setSearchFocused(false);
  };

  return (
    <>
      {/* Modern Navigation Bar */}
      <nav className={`modern-navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-wrapper">
              <img
                src="/images/logo4.png"
                alt="65 Wine & Liquor"
                className="logo-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/65st.png";
                }}
              />
            </div>
          </div>

          {/* Search Section - Desktop Only */}
          <div className="search-section desktop-search">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className={`search-container ${searchFocused ? "focused" : ""}`}>
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
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
                <button type="submit" className="search-btn">
                  Search
                </button>
              </div>

              {/* Search Suggestions */}
              {Array.isArray(suggestions) &&
                suggestions.length > 0 &&
                showSuggestions && (
                  <div className="suggestions-dropdown">
                    {suggestions.map((product, index) => (
                      <div
                        key={product._id}
                        className="suggestion-item"
                        onMouseDown={() => handleSuggestionClick(product.name)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <FaSearch className="suggestion-icon" />
                        <span>{product.name}</span>
                      </div>
                    ))}
                  </div>
                )}
            </form>
          </div>

          {/* Right Section */}
          <div className="nav-right">
            {/* Pickup Info */}
{/* Pickup Info */}
<div className="pickup-info d-none d-md-flex">
  <FaStore className="pickup-icon" />
  <div className="pickup-text">
    <span className="pickup-label">Pickup at</span>
    <a href="https://www.google.com/maps/place/65+St+Wine+%26+Liquor/@40.7123443,-73.8960677,17z/data=!4m6!3m5!1s0x89c25f57ca3f0825:0x3e28bf19985b5d7a!8m2!3d40.7123443!4d-73.8960677!16s%2Fg%2F11y2j_cznk?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D">
      <span className="pickup-location">Middle Village, NY</span>
    </a>
  </div>
</div>


            {/* Cart Button */}
            <button
              className="cart-button"
              onClick={handleCartClick}
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <FaShoppingCart className="cart-icon" />
              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
              <div className="cart-ripple"></div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Separate Row */}
        <div className="mobile-search-container">
          <div className="mobile-search-wrapper">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className={`search-container mobile-search-bar ${searchFocused ? "focused" : ""}`}>
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
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
                <button type="submit" className="search-btn">
                  Search
                </button>
              </div>

              {/* Mobile Search Suggestions */}
              {Array.isArray(suggestions) &&
                suggestions.length > 0 &&
                showSuggestions && (
                  <div className="suggestions-dropdown mobile-suggestions">
                    {suggestions.map((product, index) => (
                      <div
                        key={product._id}
                        className="suggestion-item"
                        onMouseDown={() => handleSuggestionClick(product.name)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <FaSearch className="suggestion-icon" />
                        <span>{product.name}</span>
                      </div>
                    ))}
                  </div>
                )}
            </form>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Background with Parallax Effect */}
        <div className="hero-background">
          <div className="hero-image-wrapper">
            <img
              src="/images/testing2.webp"
              alt="Premium whiskey and spirits collection"
              className="hero-image"
            />
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hero-content-inner">
            {/* Main Text */}
            <div className="hero-text-section">
              <h1 className="hero-title">
                <span className="hero-title-line">Premium</span>
                <span className="hero-title-line hero-title-accent">Collection</span>
              </h1>
              <p className="hero-subtitle">
                Wine & Spirits Preferred By Demography
              </p>
            </div>

            {/* CTA Button */}
            <div className="hero-cta-section">
              <a href="#shop-section" className="cta-button">
                <span className="cta-text">Shop Now</span>
                <div className="cta-shine"></div>
              </a>
            </div>

            {/* Delivery Partners */}
            <div className="delivery-partners">
              <div className="partners-container">
                <span className="partners-label">Available on</span>
                <div className="partners-logos">
                  <a
                    href="https://www.ubereats.com/store/65-st-wine-%26-liquor/_PLsXTmxWBGj_NAlyyN1Vg?srsltid=AfmBOoprXQO19p1HJwTCS9LaYmMXUnMkK2JKY49ngGPB42nlsZjX1C34"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-link"
                    aria-label="Order on Uber Eats"
                  >
                    <img
                      src="/images/Uber_Eats.png"
                      alt="Uber Eats"
                      className="partner-logo uber-logo"
                    />
                  </a>
                  <a
                    href="https://www.doordash.com/convenience/store/27647523"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-link"
                    aria-label="Order on DoorDash"
                  >
                    <img
                      src="/images/doordash.svg"
                      alt="DoorDash"
                      className="partner-logo doordash-logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Header;