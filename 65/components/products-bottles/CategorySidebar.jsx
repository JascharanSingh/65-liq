import React, { useState, useEffect } from "react";
import {
  FaGlassWhiskey,
  FaCocktail,
  FaWineGlass,
  FaWineBottle,
  FaBeer,
  FaLeaf,
  FaMedal,
  FaStar,
} from "react-icons/fa";

const categoryIcons = {
  Whiskey: <FaGlassWhiskey />,
  Vodka: <FaCocktail />,
  Brandy: <FaWineBottle />,
  Cognac: <FaWineBottle />,
  Liqueurs: <FaCocktail />,
  "Non-Alcoholic Drinks": <FaLeaf />,
  Rum: <FaBeer />,
  Sake: <FaWineGlass />,
  "Tequila & Mezcal": <FaWineGlass />,
  Wine: <FaWineBottle />,
  Shop: <FaStar />,
};

const CategorySidebar = ({
  onSelect,
  selectedCategory,
  selectedSubcategory,
}) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Use a ref to prevent re-fetching on every render
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    // Only fetch if data has not been fetched yet
    if (!hasFetched) {
      fetch(`${backendUrl}/api/products/categories`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          const formatted = data.map((cat) => {
            const sub = cat.subcategories || [];
            const unique = [...new Set(sub.filter(Boolean))];
            if (!unique.includes("All")) unique.unshift("All");
            return {
              name: cat.name,
              subcategories: unique.sort((a, b) => {
                if (a === "All") return -1;
                if (b === "All") return 1;
                return a.localeCompare(b);
              }),
            };
          });

          // Custom ordering for priority categories
          const priorityOrder = ["Whiskey", "Vodka", "Tequila"];
          const sorted = [
            ...priorityOrder
              .map((p) =>
                formatted.find(
                  (cat) => cat.name.toLowerCase() === p.toLowerCase()
                )
              )
              .filter(Boolean),
            ...formatted
              .filter((cat) => !priorityOrder.includes(cat.name))
              .sort((a, b) => a.name.localeCompare(b.name)),
          ];

          setCategories(sorted);
          setHasFetched(true);
        })
        .catch((err) => console.error("❌ Failed to fetch categories:", err));
    }
  }, [backendUrl, hasFetched]);

  const handleCategoryClick = (categoryName) => {
    // If the clicked category has subcategories, show them first
    const category = categories.find(cat => cat.name === categoryName);
    
    if (category && category.subcategories.length > 1) {
      if (expandedCategory === categoryName) {
        // If already expanded, collapse and go to "All"
        setExpandedCategory(null);
        setShowSubcategories(false);
        onSelect(categoryName, "All");
      } else {
        // Expand to show subcategories
        setExpandedCategory(categoryName);
        setShowSubcategories(true);
      }
    } else {
      // No subcategories, select directly
      setExpandedCategory(null);
      setShowSubcategories(false);
      onSelect(categoryName, "All");
    }
    
    // Store the selected category in session storage for state persistence
    sessionStorage.setItem("selectedCategory", categoryName);
  };

  const handleSubcategoryClick = (categoryName, subcategoryName) => {
    onSelect(categoryName, subcategoryName);
    sessionStorage.setItem("selectedCategory", categoryName);
    sessionStorage.setItem("selectedSubcategory", subcategoryName);
    
    // Keep subcategories visible after selection
  };

  const handleBackToCategories = () => {
    setExpandedCategory(null);
    setShowSubcategories(false);
  };

  return (
    <nav className="ultra-modern-sidebar">
      {/* Back Button for Subcategories */}
      {showSubcategories && (
        <button 
          className="back-to-categories-btn"
          onClick={handleBackToCategories}
        >
          ← Back to Categories
        </button>
      )}

      {/* Shop Option - Always Visible */}
      {!showSubcategories && (
        <div
          onClick={() => {
            setExpandedCategory(null);
            setShowSubcategories(false);
            onSelect("Shop", "");
            sessionStorage.setItem("selectedCategory", "Shop");
            sessionStorage.removeItem("selectedSubcategory");
          }}
          className={`ultra-modern-item ${
            selectedCategory === "Shop" ? "selected" : ""
          }`}
          role="button"
          tabIndex="0"
        >
          <div className="ultra-modern-item-content">
            <span className="ultra-modern-icon">{categoryIcons["Shop"]}</span>
            <span className="ultra-modern-text">Shop</span>
          </div>
        </div>
      )}

      {/* Categories or Subcategories */}
      {!showSubcategories ? (
        // Main Categories
        <>
          {categories.map((cat) => (
            <div key={cat.name}>
              <div
                onClick={() => handleCategoryClick(cat.name)}
                className={`ultra-modern-item ${
                  selectedCategory === cat.name ? "selected" : ""
                }`}
                role="button"
                tabIndex="0"
              >
                <div className="ultra-modern-item-content">
                  <span className="ultra-modern-icon">
                    {categoryIcons[cat.name] || <FaMedal />}
                  </span>
                  <span className="ultra-modern-text">{cat.name}</span>
                </div>
                {cat.subcategories.length > 1 && (
                  <span className="ultra-modern-arrow">→</span>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        // Subcategories Display
        <div className="subcategories-section">
          <h4 className="subcategories-title">
            <span className="subcategory-icon">
              {categoryIcons[expandedCategory] || <FaMedal />}
            </span>
            {expandedCategory}
          </h4>
          <div className="horizontal-subcategories">
            {categories
              .find((cat) => cat.name === expandedCategory)
              ?.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubcategoryClick(expandedCategory, sub)}
                  className={`horizontal-subcat-btn ${
                    selectedSubcategory === sub && selectedCategory === expandedCategory
                      ? "selected"
                      : ""
                  }`}
                >
                  {sub}
                </button>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default CategorySidebar;