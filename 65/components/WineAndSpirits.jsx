import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaStar, FaMedal, FaShoppingCart, FaGlassWhiskey, FaWineBottle } from "react-icons/fa";
import CategorySidebar from "./products-bottles/CategorySidebar";
import ProductGrid from "./products-bottles/ProductGrid";
import "./WineAndSpirits.css";

const useQuery = () => new URLSearchParams(useLocation().search);
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ---- SectionHeader: modern with icon/underline ----
const SectionHeader = ({ title, icon }) => (
  <div className="mb-4 d-flex align-items-center modern-section-header" style={{ position: "relative" }}>
    <h4
      className="mb-0 d-flex align-items-center"
      style={{
        fontFamily: "Playfair Display, serif",
        fontWeight: "700",
        fontSize: "1.65rem",
        color: "#1F2937",
        letterSpacing: "-0.5px"
      }}
    >
      {icon && <span style={{ marginRight: 12, display: "flex", alignItems: "center" }}>{icon}</span>}
      {title}
    </h4>
    <div className="modern-section-underline" />
  </div>
);

// ---- Modern LoadingSpinner ----
const LoadingSpinner = () => (
  <div className="d-flex flex-column justify-content-center align-items-center py-5">
    <div
      className="spinner-border"
      style={{
        color: "#E97451",
        width: "2.6rem",
        height: "2.6rem",
        borderWidth: "0.35em",
        animation: "modern-spin 0.9s linear infinite"
      }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        color: "#E97451",
        marginTop: 14,
        fontWeight: 500,
        letterSpacing: "0.02em",
        fontSize: "1.09rem"
      }}
    >
      Loading products...
    </div>
  </div>
);

const ErrorAlert = ({ message }) => (
  <div
    className="alert d-flex align-items-center justify-content-center text-center mb-4"
    style={{
      backgroundColor: "#FEF2F2",
      border: "1px solid #FECACA",
      borderRadius: "12px",
      color: "#DC2626",
      fontFamily: "Inter, sans-serif",
      fontWeight: "500",
    }}
  >
    <span className="me-2" style={{ fontSize: "1.2rem" }}>
      ⚠️
    </span>
    {message}
  </div>
);

const getFilteredProducts = (products, filterFn) => {
  if (!Array.isArray(products)) return [];
  return products.filter(filterFn);
};

const WineAndSpirits = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get("query") || "";

  const [selectedCategory, setSelectedCategory] = useState("Shop");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [shopProducts, setShopProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelect = (category, subcategory = "All") => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    if (category === "Shop") {
      navigate("/wine-and-spirits", { replace: true });
    }
    setSidebarOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${backendUrl}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.products;
        setShopProducts(Array.isArray(items) ? items : []);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load product data. Check API or server.");
        setShopProducts([]); // fallback to empty array on error
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCategory !== "Shop" && selectedCategory !== "Search Results") {
      setLoading(true);
      fetch(`${backendUrl}/api/products/category/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setCategoryProducts(data);
          setError(null);
        })
        .catch(() => {
          setError(`Could not load ${selectedCategory} products.`);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (searchQuery) {
      setSelectedCategory("Search Results");
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      fetch(`${backendUrl}/api/products/search?query=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setError(null);
        })
        .catch(() => {
          setError("Could not fetch search results.");
        })
        .finally(() => setLoading(false));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // ----- Section config for Shop sections -----
  const shopSections = [
    {
      key: "Best Sellers",
      title: "Best Sellers",
      filter: (p) => p.bestSeller,
      icon: <FaMedal style={{ color: "#FFD700" }} />
    },
    {
      key: "On Sale",
      title: "On Sale",
      filter: (p) => p.onSale,
      icon: <FaShoppingCart style={{ color: "#E97451" }} />
    },
    {
      key: "New Arrivals",
      title: "New Arrivals",
      filter: (p) => p.newArrival,
      icon: <FaStar style={{ color: "#E97451" }} />
    },
    {
      key: "Whiskey",
      title: "Whiskey",
      filter: (p) => p.category?.toLowerCase() === "whiskey",
      icon: <FaGlassWhiskey style={{ color: "#d4b277" }} />
    },
    {
      key: "Vodka",
      title: "Vodka",
      filter: (p) => p.category?.toLowerCase() === "vodka",
      icon: <FaWineBottle style={{ color: "#5e7fd7" }} />
    },
    {
      key: "Wine",
      title: "Wine",
      filter: (p) => p.category?.toLowerCase() === "wine",
      icon: <FaWineBottle style={{ color: "#d91e47" }} />
    }
  ];

  return (
    <section id="shop-section" className="section py-5">
      <div className="container">
        {/* <div className="text-center mb-5">
          <h2
            className="section-title mb-3"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "2.5rem",
              fontWeight: "600",
              color: "#1F2937",
            }}
          >
            Wine & Spirits
          </h2>
          <p
            className="lead text-muted"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.1rem",
              color: "#6B7280",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Discover our curated collection of premium wines and spirits
          </p>
        </div> */}

        {error && <ErrorAlert message={error} />}

        <div className="row">
          {/* Burger menu only on mobile */}
          <div className="d-md-none mb-3 text-start">
            <button
              className="burger-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle category menu"
            >
              <FaBars />
              Categories
            </button>
          </div>

          {/* Sidebar */}
          <div
            className={`col-md-3 mb-4 pe-4 ${
              sidebarOpen ? "d-block" : "d-none"
            } d-md-block`}
          >
            <div
              style={{
                position: "sticky",
                top: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "1.5rem",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(229, 231, 235, 0.5)",
              }}
            >
              <h5
                className="mb-3"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Categories
              </h5>
              <CategorySidebar
                onSelect={handleSelect}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 ps-4">
            {loading ? (
              <LoadingSpinner />
            ) : selectedCategory === "Search Results" ? (
              <>
                <SectionHeader title={`Search Results for "${searchQuery}"`} icon={<FaStar style={{ color: "#E97451" }} />} />
                <ProductGrid products={searchResults} isShopView={false} />
              </>
            ) : selectedCategory === "Shop" ? (
              <div className="shop-sections">
                {shopSections.map(({ key, title, filter, icon }) => (
                  <div className="mb-5" key={key}>
                    <SectionHeader title={title} icon={icon} />
                    <ProductGrid
                      products={getFilteredProducts(shopProducts, filter)}
                      isShopView={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="category-view">
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <h4
                      className="mb-0 me-3"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {selectedCategory}
                    </h4>
                    {selectedSubcategory !== "All" && (
                      <span className="badge bg-primary text-white">
                        {selectedSubcategory}
                      </span>
                    )}
                  </div>
                </div>

                {selectedSubcategory === "All" ? (
                  Array.from(
                    new Set(
                      categoryProducts.map(
                        (p) => p.subcategory?.trim() || "Uncategorized"
                      )
                    )
                  )
                    .filter(Boolean)
                    .sort()
                    .map((subcat) => {
                      const label =
                        subcat === "Uncategorized" ? "Other" : subcat;
                      const productsInSub = categoryProducts.filter(
                        (p) =>
                          (p.subcategory?.trim() || "Uncategorized") === subcat
                      );
                      return (
                        <div key={subcat} className="mb-5">
                          <SectionHeader title={label} />
                          <ProductGrid
                            products={productsInSub}
                            isShopView={true}
                          />
                        </div>
                      );
                    })
                ) : (
                  <ProductGrid
                    products={categoryProducts.filter(
                      (p) =>
                        p.subcategory?.toLowerCase().trim() ===
                        selectedSubcategory.toLowerCase().trim()
                    )}
                    isShopView={false}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineAndSpirits;