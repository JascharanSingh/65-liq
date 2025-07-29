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
    <section className="wine-section py-5">
      <div className="container">
        {/* Title */}
        <h2 className="section-title text-center mb-4">Wine & Spirits</h2>

        {/* Filter Pills */}
        <div className="mb-5 d-flex flex-wrap justify-content-center gap-2">
          {filters.map((filter, index) => (
            <button
              key={index}
              className="btn btn-sienna-outline btn-sm rounded-pill px-3"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Category Grid */}
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4">
          {categories.map((category, index) => (
            <div key={index} className="col">
              <a href="#" className="category-link d-block text-center">
                {category}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WineAndSpirits;