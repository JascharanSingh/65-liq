import React, { useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductGrid = ({ products = [], isShopView = false }) => {
  const scrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { addToCart } = useCart();

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const amount = container.offsetWidth * 0.85;
      container.scrollBy({
        left: direction === 'right' ? amount : -amount,
        behavior: 'smooth',
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setQuantity(1);
    setShowFullDescription(false);
  };

  const ProductModal = () => {
    if (!selectedProduct) return null;

    const shortDescription = selectedProduct.description?.slice(0, 160);
    const shouldTruncate = selectedProduct.description?.length > 160;

    return (
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-4">
            <div className="modal-header border-0">
              <h5 className="modal-title">{selectedProduct.brand} {selectedProduct.volume}</h5>
              <button type="button" className="btn-close" onClick={() => { setSelectedProduct(null); setShowFullDescription(false); }}></button>
            </div>
            <div className="modal-body d-flex flex-column flex-md-row gap-4">
              <div className="flex-shrink-0" style={{ maxWidth: '250px' }}>
                <img
                  src={selectedProduct.image || 'https://placehold.co/250x300'}
                  alt={selectedProduct.name}
                  className="img-fluid rounded"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="flex-grow-1">
                <h4>{selectedProduct.name}</h4>
                <p className="text-muted">
                  {showFullDescription || !shouldTruncate ? selectedProduct.description : `${shortDescription}...`}
                  {shouldTruncate && (
                    <button
                      className="btn btn-link p-0 ms-1"
                      style={{ fontSize: '0.9rem' }}
                      onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                      {showFullDescription ? 'Show less' : 'See more'}
                    </button>
                  )}
                </p>
                <p className="fw-bold" style={{ color: '#E97451' }}>${selectedProduct.price}</p>
                <div className="mb-3">
                  <label className="form-label">Quantity:</label>
                  <select className="form-select" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-success w-100" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCard = (product) => (
    <div
      key={product._id}
      className="scroll-snap-item"
      style={{
        width: '220px',
        flex: '0 0 auto',
        scrollSnapAlign: 'start',
      }}
    >
      <div
        className="card border-0 text-center d-flex flex-column justify-content-between h-100"
        style={{
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          cursor: 'pointer',
        }}
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={product.image || 'https://placehold.co/180x220/F3F4F6/9CA3AF?text=No+Image'}
          alt={product.name}
          className="card-img-top"
          style={{ height: '180px', objectFit: 'contain', backgroundColor: '#F9FAFB' }}
        />
        <div className="card-body p-3 d-flex flex-column justify-content-between">
          <div style={{ fontWeight: 'bold' }}>{product.brand} {product.volume}</div>
          <div>{product.name}</div>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="small fw-semibold" style={{ color: '#E97451' }}>
              ${product.price}
            </div>
            <button
              className="btn btn-sm px-2 py-1"
              style={{
                fontSize: '0.8rem',
                border: '1px solid #E97451',
                color: '#E97451',
                backgroundColor: 'transparent',
                transition: 'all 0.2s ease-in-out',
              }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#E97451';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#E97451';
              }}
            >
              ➕
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ProductModal />
      <div className="scroll-wrapper position-relative">
        <button className="btn-scroll left" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </button>
        <button className="btn-scroll right" onClick={() => scroll('right')}>
          <FaChevronRight />
        </button>
        <div
          className="d-flex gap-3 overflow-auto product-row"
          ref={scrollRef}
        >
          {products.map(renderCard)}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;