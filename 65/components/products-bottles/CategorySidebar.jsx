import React, { useState, useEffect } from 'react';

const CategorySidebar = ({ onSelect, selectedCategory, selectedSubcategory }) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    fetch('/data/categories.json')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to load categories:', err));
  }, []);

  const handleCategoryClick = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
      onSelect(category, 'All');
    }
  };

  return (
    <div className="category-sidebar">
      {/* SHOP Button */}
      <div
        onClick={() => {
          setExpandedCategory(null);
          onSelect('Shop', '');
        }}
        style={{
          cursor: 'pointer',
          fontWeight: selectedCategory === 'Shop' ? 'bold' : 'normal',
          fontSize: '1.1rem',
          fontFamily: 'Inter, sans-serif',
          color: selectedCategory === 'Shop' ? '#e0633e' : '#333',
          marginBottom: '1rem',
        }}
      >
        Shop
      </div>

      {/* Category List */}
      {categories.map((cat) => (
        <div key={cat.name} className="category mb-3">
          <h5
            className="category-title"
            onClick={() => handleCategoryClick(cat.name)}
            style={{
              cursor: 'pointer',
              fontWeight: selectedCategory === cat.name ? 'bold' : 'normal',
              fontSize: '1.1rem',
              fontFamily: 'Inter, sans-serif',
              color: selectedCategory === cat.name ? '#e0633e' : '#333',
              marginBottom: '0.5rem',
            }}
          >
            {cat.name}
          </h5>

          {expandedCategory === cat.name && (
            <ul className="subcategory-list ps-3">
              {cat.subcategories.map((sub) => (
                <li
                  key={sub}
                  className="subcategory-link"
                  onClick={() => onSelect(cat.name, sub)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    color:
                      selectedCategory === cat.name && selectedSubcategory === sub
                        ? '#e0633e'
                        : '#666',
                    fontWeight:
                      selectedCategory === cat.name && selectedSubcategory === sub
                        ? 'bold'
                        : 'normal',
                    marginBottom: '0.25rem',
                  }}
                >
                  {sub}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategorySidebar;