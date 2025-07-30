import React, { useEffect, useRef, useState } from 'react';

const ProductGrid = ({ selectedCategory, selectedSubcategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/data/products.json');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: direction === 'right' ? 300 : -300,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <p>Loading products...</p>;

  let filtered = [];

  if (selectedCategory === 'Shop') {
    filtered = products.filter((p) =>
      p.tags?.includes(selectedSubcategory.toLowerCase())
    );
  } else {
    filtered = products.filter(
      (product) =>
        product.category === selectedCategory &&
        (selectedSubcategory === 'All' || product.subcategory === selectedSubcategory)
    );
  }

  const showScrollButtons = selectedCategory === 'Shop' && filtered.length > 4;

  return selectedCategory === 'Shop' ? (
    <div className="position-relative">
      {/* Scroll buttons at top-right */}
      {showScrollButtons && (
        <div className="d-flex justify-content-end mb-2 pe-2 gap-2">
          <button className="btn-scroll" onClick={() => scroll('left')}>
            &larr;
          </button>
          <button className="btn-scroll" onClick={() => scroll('right')}>
            &rarr;
          </button>
        </div>
      )}

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="d-flex overflow-auto pb-3 px-2"
        style={{ scrollBehavior: 'smooth', gap: '1rem' }}
      >
        {filtered.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="card border-0 shadow-sm"
            style={{
              minWidth: '180px',
              maxWidth: '180px',
              flex: '0 0 auto',
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top"
              style={{ height: '160px', objectFit: 'contain' }}
            />
            <div className="card-body px-3 py-2">
              <h6 className="mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                {product.title}
              </h6>
              <p
                className="text-muted mb-2"
                style={{ fontSize: '0.8rem', lineHeight: '1.3' }}
              >
                {product.description}
              </p>
              <p className="fw-semibold mb-0" style={{ fontSize: '0.9rem', color: '#E97451' }}>
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="row">
      {filtered.map((product, index) => (
        <div key={`${product.id}-${index}`} className="col-6 col-md-4 col-lg-3 mb-4">
          <div
            className="card h-100 border-0 shadow-sm"
            style={{ borderRadius: '12px', fontFamily: 'Inter, sans-serif' }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top"
              style={{ objectFit: 'contain', height: '160px' }}
            />
            <div className="card-body px-3 py-2">
              <h6 className="mb-1" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                {product.title}
              </h6>
              <p
                className="text-muted mb-2"
                style={{ fontSize: '0.8rem', lineHeight: '1.3' }}
              >
                {product.description}
              </p>
              <p className="fw-semibold mb-0" style={{ fontSize: '0.9rem', color: '#E97451' }}>
                {product.price}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;