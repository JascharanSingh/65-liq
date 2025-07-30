import React, { useState } from 'react';
import CategorySidebar from './products-bottles/CategorySidebar';
import ProductGrid from './products-bottles/ProductGrid';
import './WineAndSpirits.css';

const WineAndSpirits = () => {
  const [selectedCategory, setSelectedCategory] = useState('Shop');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  const handleSelect = (category, subcategory = 'All') => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  return (
    <section id="shop-section" className="section py-5">
      <div className="container">
        <h2 className="section-title mb-5 text-center">Wine & Spirits</h2>

        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <CategorySidebar
              onSelect={handleSelect}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
            />
          </div>

          {/* Product Display */}
          <div className="col-md-9">
            {selectedCategory === 'Shop' ? (
              <>
                {/* Best Sellers */}
                <h4 className="mb-3">Best Sellers</h4>
                <ProductGrid selectedCategory="Shop" selectedSubcategory="Best Sellers" />

                {/* Trending */}
                <h4 className="mt-5 mb-3">Trending</h4>
                <ProductGrid selectedCategory="Shop" selectedSubcategory="Trending" />

                {/* On Sale */}
                <h4 className="mt-5 mb-3">On Sale</h4>
                <ProductGrid selectedCategory="Shop" selectedSubcategory="On Sale" />

                {/* New Arrivals */}
                <h4 className="mt-5 mb-3">New Arrivals</h4>
                <ProductGrid selectedCategory="Shop" selectedSubcategory="New Arrivals" />

                {/* Featured Categories */}
                <h4 className="mt-5 mb-3">Whiskey</h4>
                <ProductGrid selectedCategory="Whiskey" selectedSubcategory="All" />

                <h4 className="mt-5 mb-3">Vodka</h4>
                <ProductGrid selectedCategory="Vodka" selectedSubcategory="All" />

                <h4 className="mt-5 mb-3">Wine</h4>
                <ProductGrid selectedCategory="Wine" selectedSubcategory="All" />
              </>
            ) : (
              <>
                <h4 className="mb-4">
                  {selectedCategory}
                  {selectedSubcategory && selectedSubcategory !== 'All'
                    ? ` — ${selectedSubcategory}`
                    : ''}
                </h4>
                <ProductGrid
                  selectedCategory={selectedCategory}
                  selectedSubcategory={selectedSubcategory}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineAndSpirits;