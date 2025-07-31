import React, { useRef } from 'react';

const ProductGrid = ({ products = [], isShopView = false }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: direction === 'right' ? 300 : -300,
        behavior: 'smooth',
      });
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5">
        <div className="text-center">
          <div className="mb-3" style={{ fontSize: '3rem', color: '#E5E7EB' }}>📦</div>
          <p className="text-muted mb-0" style={{ fontSize: '1.1rem', fontFamily: 'Inter, sans-serif' }}>
            No products found
          </p>
        </div>
      </div>
    );
  }

  const showScrollButtons = isShopView && products.length > 4;

  return isShopView ? (
    <div className="position-relative">
      {/* Modern Scroll Buttons */}
      {showScrollButtons && (
        <div className="d-flex justify-content-end mb-3 pe-2 gap-2">
          <button
            className="btn d-flex align-items-center justify-content-center border-0 shadow-sm"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              color: '#6B7280',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}
            onClick={() => scroll('left')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F9FAFB';
              e.target.style.color = '#E97451';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#6B7280';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }}
          >
            ‹
          </button>
          <button
            className="btn d-flex align-items-center justify-content-center border-0 shadow-sm"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              color: '#6B7280',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}
            onClick={() => scroll('right')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#F9FAFB';
              e.target.style.color = '#E97451';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#6B7280';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }}
          >
            ›
          </button>
        </div>
      )}

      {/* Horizontal Scrollable Product Cards */}
      <div
        ref={scrollRef}
        className="d-flex overflow-auto pb-3 px-1"
        style={{ 
          scrollBehavior: 'smooth', 
          gap: '1.25rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {products.map((product) => {
          const {
            _id,
            name = 'Unnamed',
            image = 'https://placehold.co/180x220/F3F4F6/9CA3AF?text=No+Image',
            description = 'No description provided',
            price = '0.00',
          } = product;

          return (
            <div
              key={_id}
              className="card border-0 text-center position-relative overflow-hidden"
              style={{
                minWidth: '190px',
                maxWidth: '190px',
                flex: '0 0 auto',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div className="position-relative overflow-hidden" style={{ borderRadius: '16px 16px 0 0' }}>
                <img
                  src={image}
                  alt={name}
                  className="card-img-top"
                  style={{ 
                    height: '180px', 
                    objectFit: 'contain',
                    backgroundColor: '#F9FAFB',
                    transition: 'transform 0.3s ease'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/180x220/F3F4F6/9CA3AF?text=No+Image';
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <div className="card-body p-3">
                <h6 
                  className="card-title mb-2 lh-sm" 
                  style={{ 
                    fontSize: '0.95rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '600',
                    color: '#1F2937',
                    height: '2.4em',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {name}
                </h6>
                <p 
                  className="card-text text-muted mb-3 small" 
                  style={{ 
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '1.4',
                    height: '2.8em',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {description}
                </p>
                <div className="d-flex align-items-center justify-content-center">
                  <span 
                    className="fw-bold mb-0" 
                    style={{ 
                      color: '#E97451', 
                      fontSize: '1.1rem',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    ${price}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="row g-4">
      {products.map((product) => {
        const {
          _id,
          name = 'Unnamed',
          image = 'https://placehold.co/180x220/F3F4F6/9CA3AF?text=No+Image',
          description = 'No description provided',
          price = '0.00',
        } = product;

        return (
          <div key={_id} className="col-6 col-md-4 col-lg-3">
            <div 
              className="card h-100 border-0 text-center position-relative overflow-hidden"
              style={{ 
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div className="position-relative overflow-hidden" style={{ borderRadius: '16px 16px 0 0' }}>
                <img
                  src={image}
                  alt={name}
                  className="card-img-top"
                  style={{ 
                    height: '180px', 
                    objectFit: 'contain',
                    backgroundColor: '#F9FAFB',
                    transition: 'transform 0.3s ease'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/180x220/F3F4F6/9CA3AF?text=No+Image';
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <div className="card-body p-3 d-flex flex-column">
                <h6 
                  className="card-title mb-2 lh-sm" 
                  style={{ 
                    fontSize: '0.95rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '600',
                    color: '#1F2937',
                    height: '2.4em',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {name}
                </h6>
                <p 
                  className="card-text text-muted mb-3 small flex-grow-1" 
                  style={{ 
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '1.4',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {description}
                </p>
                <div className="d-flex align-items-center justify-content-center mt-auto">
                  <span 
                    className="fw-bold mb-0" 
                    style={{ 
                      color: '#E97451', 
                      fontSize: '1.1rem',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    ${price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;