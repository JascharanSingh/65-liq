import React, { useState, useEffect } from 'react';
import CategorySidebar from './products-bottles/CategorySidebar';
import ProductGrid from './products-bottles/ProductGrid';
import './WineAndSpirits.css';

const WineAndSpirits = () => {
  const [selectedCategory, setSelectedCategory] = useState('Shop');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [shopProducts, setShopProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (category, subcategory = 'All') => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setShopProducts(data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load product data. Check API or server.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory !== 'Shop') {
      setLoading(true);
      fetch(`http://localhost:4000/api/products/category/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setCategoryProducts(data);
          setError(null);
        })
        .catch(() => {
          setError(`Could not load ${selectedCategory} products.`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  const SectionHeader = ({ title }) => (
    <div className="mb-4 d-flex align-items-center justify-content-between">
      <h4
        className="mb-0"
        style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: '600',
          fontSize: '1.5rem',
          color: '#1F2937',
        }}
      >
        {title}
      </h4>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div
        className="spinner-border"
        style={{ color: '#E97451', width: '2.5rem', height: '2.5rem' }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const ErrorAlert = ({ message }) => (
    <div
      className="alert d-flex align-items-center justify-content-center text-center mb-4"
      style={{
        backgroundColor: '#FEF2F2',
        border: '1px solid #FECACA',
        borderRadius: '12px',
        color: '#DC2626',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500'
      }}
    >
      <span className="me-2" style={{ fontSize: '1.2rem' }}>⚠️</span>
      {message}
    </div>
  );

  const getFilteredProducts = (products, filterFn) => {
    const filtered = products.filter(filterFn);
    return filtered.length > 0 ? filtered : [];
  };

  return (
    <section id="shop-section" className="section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2
            className="section-title mb-3"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.5rem',
              fontWeight: '600',
              color: '#1F2937'
            }}
          >
            Wine & Spirits
          </h2>
          <p
            className="lead text-muted"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.1rem',
              color: '#6B7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Discover our curated collection of premium wines and spirits
          </p>
        </div>

        {error && <ErrorAlert message={error} />}

        <div className="row">
          <div className="col-md-3 mb-4 pe-4">
            <div
              style={{
                position: 'sticky',
                top: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(229, 231, 235, 0.5)'
              }}
            >
              <h5
                className="mb-3"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '2px solid #F3F4F6',
                  paddingBottom: '0.5rem'
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

          <div className="col-md-9 ps-4">
            {loading ? (
              <LoadingSpinner />
            ) : selectedCategory === 'Shop' ? (
              <div className="shop-sections">
                {/* Best Sellers Section */}
                <div className="mb-5">
                  <SectionHeader title="Best Sellers" />
                  <ProductGrid
                    products={getFilteredProducts(shopProducts, p => p.bestSeller)}
                    isShopView={true}
                  />
                </div>

                {/* On Sale Section */}
                <div className="mb-5">
                  <SectionHeader title="On Sale" />
                  <ProductGrid
                    products={getFilteredProducts(shopProducts, p => p.onSale)}
                    isShopView={true}
                  />
                </div>

                {/* New Arrivals Section */}
                <div className="mb-5">
                  <SectionHeader title="New Arrivals" />
                  <ProductGrid
                    products={getFilteredProducts(shopProducts, p => p.newArrival)}
                    isShopView={true}
                  />
                </div>

                {/* Category Sections (e.g. Whiskey, Wine, Vodka) */}
                <div className="mb-5">
                  <SectionHeader title="Whiskey" />
                  <ProductGrid
                    products={getFilteredProducts(shopProducts, p => p.category?.toLowerCase() === 'whiskey')}
                    isShopView={true}
                  />
                </div>

                <div className="mb-5">
                  <SectionHeader title="Vodka" />
                  <ProductGrid
                    products={getFilteredProducts(shopProducts, p => p.category?.toLowerCase() === 'vodka')}
                    isShopView={true}
                  />
                </div>

                <div className="mb-5">
                  <SectionHeader title="Wine" />
                  <ProductGrid
                    products={getFilteredProducts(shopProducts, p => p.category?.toLowerCase() === 'wine')}
                    isShopView={true}
                  />
                </div>
              </div>
            ) : (
              <div className="category-view">
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <h4
                      className="mb-0 me-3"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: '600',
                        fontSize: '1.75rem',
                        color: '#1F2937'
                      }}
                    >
                      {selectedCategory}
                    </h4>
                    {selectedSubcategory && selectedSubcategory !== 'All' && (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: '#E97451',
                          color: '#ffffff',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        {selectedSubcategory}
                      </span>
                    )}
                  </div>
                  <div
                    className="mb-4"
                    style={{
                      height: '2px',
                      background: 'linear-gradient(90deg, #E97451 0%, rgba(233, 116, 81, 0.1) 100%)',
                      borderRadius: '1px'
                    }}
                  />
                </div>

                {selectedSubcategory === 'All' ? (
                  <>
                    {Array.from(new Set(categoryProducts.map(p => p.subcategory?.trim() || 'Uncategorized')))
                      .filter(Boolean)
                      .sort()
                      .map((subcat) => {
                        const label = subcat === 'Uncategorized' ? 'Other' : subcat;
                        const productsInSub = categoryProducts.filter(
                          p => (p.subcategory?.trim() || 'Uncategorized') === subcat
                        );
                        return (
                          <div key={subcat} className="mb-5">
                            <SectionHeader title={label} />
                            <ProductGrid products={productsInSub} isShopView={true} />
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <ProductGrid
                    products={categoryProducts.filter(p =>
                      p.subcategory?.toLowerCase().trim() === selectedSubcategory.toLowerCase().trim()
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
