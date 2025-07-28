// src/components/WineAndSpirits.jsx
import React from "react";

const categories = [
  "Cider", "Orange Wine", "Sparkling Wine", "Cocktails & Mixers",
  "Red Wine", "Tequila & Mezcal", "Cognac & Brandy", "Rosé Wine",
  "Vermouth & Bitters", "Fortified & Sweet", "Rum", "Vodka",
  "Gin", "Sake", "Whiskey", "Liqueurs", "Select Sips", "White Wine",
];

const filters = ["Sale", "New", "Gluten-Free", "Organic", "Kosher", "Local"];

const WineAndSpirits = () => {
  return (
    <div className="container py-15">
      <h4 className="fw-bold mb-3">Wine & Spirits</h4>

      <div className="mb-4 d-flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <button key={index} className="btn btn-outline-secondary btn-sm rounded-pill">
            {filter}
          </button>
        ))}
      </div>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-2">
        {categories.map((category, index) => (
          <div key={index} className="col">
            <span className="text-decoration-none text-dark d-inline-block">
              {category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineAndSpirits;