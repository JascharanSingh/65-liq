import React, { useRef, useState } from 'react';

const ProductGrid = ({ products = [], isShopView = false }) => {
  const scrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: direction === 'right' ? 300 : -300,
        behavior: 'smooth',
      });
    }
  };

  const handleAddToCart = () => {
    const existing = cartItems.find(
      (item) => item._id === selectedProduct._id && item.volume === selectedProduct.volume
    );

    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === existing._id && item.volume === existing.volume
            ? { ...item, qty: item.qty + quantity }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...selectedProduct, qty: quantity }]);
    }

    setSelectedProduct(null);
    setQuantity(1);
    setShowFullDescription(false);
    setShowCart(true);
  };

  const CartSidebar = () => (
    <div
      className={`cart-sidebar position-fixed top-0 end-0 h-100 bg-white shadow-lg p-4 transition-all`}
      style={{ width: '50vw', transform: showCart ? 'translateX(0)' : 'translateX(100%)', zIndex: 1050 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Your Cart</h5>
        <button className="btn-close" onClick={() => setShowCart(false)} />
      </div>
      {cartItems.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <div className="d-flex flex-column gap-3">
          {cartItems.map((item, idx) => (
            <div key={idx} className="d-flex align-items-center gap-3 border-bottom pb-2">
              <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: 'contain' }} />
              <div className="flex-grow-1">
                <div className="fw-bold small">{item.brand} {item.volume}</div>
                <div className="small">{item.name}</div>
                <div className="small text-muted">{item.qty} x ${item.price}</div>
              </div>
              <div className="fw-bold">${(item.qty * item.price).toFixed(2)}</div>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <div>Total:</div>
            <div>
              ${cartItems.reduce((total, item) => total + item.qty * item.price, 0).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );

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
      className="card border-0 text-center position-relative overflow-hidden"
      style={{
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer'
      }}
      onClick={() => setSelectedProduct(product)}
    >
      <img
        src={product.image || 'https://placehold.co/180x220/F3F4F6/9CA3AF?text=No+Image'}
        alt={product.name}
        className="card-img-top"
        style={{ height: '180px', objectFit: 'contain', backgroundColor: '#F9FAFB' }}
      />
      <div className="card-body p-3">
        <div style={{ fontWeight: 'bold' }}>{product.brand} {product.volume}</div>
        <div>{product.name}</div>
        <div className="small mt-2" style={{ color: '#E97451' }}>${product.price}</div>
      </div>
    </div>
  );

  return (
    <>
      <ProductModal />
      <CartSidebar />
      <div className="row g-4">
        {products.map((product) => (
          <div key={product._id} className="col-6 col-md-4 col-lg-3">
            {renderCard(product)}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
