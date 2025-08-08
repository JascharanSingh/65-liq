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
    // If the clicked category is already expanded, collapse it. Otherwise, expand it.
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
      // Automatically select 'All' subcategory when a category is expanded
      onSelect(categoryName, "All");
    }
    // Store the selected category in session storage for state persistence
    sessionStorage.setItem("selectedCategory", categoryName);
  };

  const handleSubcategoryClick = (categoryName, subcategoryName) => {
    onSelect(categoryName, subcategoryName);
    sessionStorage.setItem("selectedCategory", categoryName);
    sessionStorage.setItem("selectedSubcategory", subcategoryName);
  };

  return (
    <nav className="category-sidebar modern-sidebar-wrapper">
      {/* Shop Option */}
      <div
        onClick={() => {
          setExpandedCategory(null);
          onSelect("Shop", "");
          sessionStorage.setItem("selectedCategory", "Shop");
          sessionStorage.removeItem("selectedSubcategory");
        }}
        className={`modern-sidebar-item ${
          selectedCategory === "Shop" ? "selected" : ""
        }`}
        role="button"
        tabIndex="0"
      >
        <span className="modern-sidebar-icon">{categoryIcons["Shop"]}</span>
        <span className="modern-sidebar-text">Shop</span>
      </div>

      {/* Dynamic Categories */}
      {categories.map((cat) => (
        <div key={cat.name} className="modern-category-container">
          <div
            onClick={() => handleCategoryClick(cat.name)}
            className={`modern-sidebar-item ${
              selectedCategory === cat.name ? "selected" : ""
            } ${expandedCategory === cat.name ? "expanded" : ""}`}
            role="button"
            tabIndex="0"
          >
            <span className="d-flex align-items-center">
              <span className="modern-sidebar-icon">
                {categoryIcons[cat.name] || <FaMedal />}
              </span>
              <span className="modern-sidebar-text">{cat.name}</span>
            </span>
            {cat.subcategories.length > 1 && (
              <span className="modern-sidebar-expand">▼</span>
            )}
          </div>
          {/* Subcategories List */}
          {expandedCategory === cat.name && cat.subcategories.length > 1 && (
            <div className="modern-subcat-list">
              {cat.subcategories.map((sub) => (
                <div
                  key={sub}
                  onClick={() => handleSubcategoryClick(cat.name, sub)}
                  className={`modern-sidebar-subcat ${
                    selectedSubcategory === sub && selectedCategory === cat.name
                      ? "selected"
                      : ""
                  }`}
                  role="button"
                  tabIndex="0"
                >
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default CategorySidebar;
