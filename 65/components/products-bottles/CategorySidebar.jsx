import React, { useState, useEffect } from "react";

const CategorySidebar = ({ onSelect, selectedCategory, selectedSubcategory }) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    const controller = new AbortController();
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products/categories`, {
          signal: controller.signal,
        });
        const data = await res.json();

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

        const priorityOrder = ["Whiskey", "Vodka", "Tequila"];
        const sorted = [
          ...priorityOrder
            .map((p) =>
              formatted.find((cat) => cat.name.toLowerCase() === p.toLowerCase())
            )
            .filter(Boolean),
          ...formatted
            .filter((cat) => !priorityOrder.includes(cat.name))
            .sort((a, b) => a.name.localeCompare(b.name)),
        ];

        setCategories(sorted);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("❌ Failed to fetch categories:", err.message);
        }
      }
    };

    fetchCategories();

    return () => controller.abort(); // ✅ cancel on unmount
  }, [backendUrl]);

  const handleCategoryClick = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
      onSelect(category, "All");
    }
  };

  return (
    <div className="category-sidebar">
      {/* Shop Option */}
      <div
        onClick={() => {
          setExpandedCategory(null);
          onSelect("Shop", "");
        }}
        className="mb-1"
        style={{
          cursor: "pointer",
          fontWeight: selectedCategory === "Shop" ? "600" : "500",
          fontSize: "1.1rem",
          fontFamily: "Inter, sans-serif",
          color: selectedCategory === "Shop" ? "#E97451" : "#374151",
          padding: "0.75rem 0",
          borderBottom:
            selectedCategory === "Shop"
              ? "2px solid #E97451"
              : "2px solid transparent",
          transition: "all 0.2s ease",
          borderRadius: "4px 4px 0 0",
        }}
        onMouseEnter={(e) => {
          if (selectedCategory !== "Shop") {
            e.target.style.color = "#E97451";
          }
        }}
        onMouseLeave={(e) => {
          if (selectedCategory !== "Shop") {
            e.target.style.color = "#374151";
          }
        }}
      >
        Shop
      </div>

      {/* Dynamic Categories */}
      {categories.map((cat) => (
        <div key={cat.name} className="mb-1">
          <div
            onClick={() => handleCategoryClick(cat.name)}
            className="d-flex align-items-center justify-content-between"
            style={{
              cursor: "pointer",
              fontWeight: selectedCategory === cat.name ? "600" : "500",
              fontSize: "1.1rem",
              fontFamily: "Inter, sans-serif",
              color: selectedCategory === cat.name ? "#E97451" : "#374151",
              padding: "0.75rem 0",
              borderBottom:
                selectedCategory === cat.name
                  ? "2px solid #E97451"
                  : "2px solid transparent",
              transition: "all 0.2s ease",
              borderRadius: "4px 4px 0 0",
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== cat.name) {
                e.target.style.color = "#E97451";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== cat.name) {
                e.target.style.color = "#374151";
              }
            }}
          >
            <span>{cat.name}</span>
            {cat.subcategories.length > 1 && (
              <span
                style={{
                  fontSize: "0.8rem",
                  transform:
                    expandedCategory === cat.name ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  color: "inherit",
                  opacity: 0.6,
                }}
              >
                ▼
              </span>
            )}
          </div>

          {expandedCategory === cat.name && cat.subcategories.length > 1 && (
            <div
              className="pb-2"
              style={{
                borderLeft: "1px solid #F3F4F6",
                marginLeft: "0.5rem",
                paddingLeft: "1rem",
              }}
            >
              {cat.subcategories.map((sub) => (
                <div
                  key={sub}
                  onClick={() => onSelect(cat.name, sub)}
                  style={{
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontFamily: "Inter, sans-serif",
                    color: selectedSubcategory === sub ? "#E97451" : "#6B7280",
                    fontWeight: selectedSubcategory === sub ? "500" : "400",
                    padding: "0.5rem 0",
                    transition: "color 0.2s ease",
                    lineHeight: "1.2",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSubcategory !== sub) {
                      e.target.style.color = "#374151";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSubcategory !== sub) {
                      e.target.style.color = "#6B7280";
                    }
                  }}
                >
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategorySidebar;