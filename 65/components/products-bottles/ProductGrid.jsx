import React, { useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
  FaMedal,
} from "react-icons/fa";

const ProductGrid = ({ products = [], isShopView = false }) => {
  const scrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const { addToCart } = useCart();

  // Favorite handling
  const toggleFavorite = (productId) => {
    const updated = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const amount = container.offsetWidth * 0.85;
      container.scrollBy({
        left: direction === "right" ? amount : -amount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setQuantity(1);
    setShowFullDescription(false);
  };

  const renderBadges = (product) => (
    <div className="badges">
      {product.bestSeller && (
        <span className="badge badge-bestseller">
          <FaMedal style={{ marginRight: 3 }} /> Best Seller
        </span>
      )}
      {product.onSale && (
        <span className="badge badge-onsale">
          <FaShoppingCart style={{ marginRight: 3 }} /> On Sale
        </span>
      )}
      {product.newArrival && (
        <span className="badge badge-new">
          <FaStar style={{ marginRight: 3 }} /> New
        </span>
      )}
      {product.staffPick && (
        <span className="badge badge-staff">
          <FaStar style={{ marginRight: 3 }} /> Staff Pick
        </span>
      )}
    </div>
  );

  const renderCard = (product) => (
    <div
      key={product._id}
      className="scroll-snap-item modern-product-card"
      style={{
        width: "240px",
        flex: "0 0 auto",
        scrollSnapAlign: "start",
        position: "relative",
        overflow: "visible",
      }}
    >
      <div
        className="card card-3d-effect border-0 text-center d-flex flex-column justify-content-between h-100"
        style={{
          borderRadius: "20px",
          background: "rgba(255,255,255,0.92)",
          boxShadow: "0 8px 32px rgba(100, 40, 0, 0.12)",
          cursor: "pointer",
          minHeight: 380,
          paddingBottom: 0,
          position: "relative",
        }}
        onClick={() => setSelectedProduct(product)}
      >
        {/* Favorite Button */}
        <button
          className="favorite-btn"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product._id);
          }}
        >
          {favorites.includes(product._id) ? (
            <FaHeart style={{ color: "#E97451", fontSize: 21 }} />
          ) : (
            <FaRegHeart style={{ color: "#9CA3AF", fontSize: 21 }} />
          )}
        </button>

        {/* Badges */}
        {renderBadges(product)}

        {/* Product Image */}
        <img
          src={
            product.image ||
            "https://placehold.co/220x250/F3F4F6/9CA3AF?text=No+Image"
          }
          alt={product.name}
          className="card-img-top"
          style={{
            height: "160px",
            objectFit: "contain",
            backgroundColor: "#F9FAFB",
            borderRadius: 14,
            marginTop: 8,
          }}
        />

        {/* Card Content */}
        <div
          className="card-body p-3 d-flex flex-column justify-content-between"
          style={{ flexGrow: 1 }}
        >
          <div className="modern-card-title">{product.name}</div>
          <div className="modern-card-brand">
            {product.brand}{" "}
            <span className="modern-volume">{product.volume}</span>
          </div>
          {product.rating && (
            <div className="modern-rating">
              <FaStar
                style={{ color: "#FFB300", fontSize: 14, marginRight: 3 }}
              />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}
          <div className="modern-description">
            {product.description?.slice(0, 50)}...
          </div>
        </div>
        <div className="modern-product-footer">
          <div className="modern-price">${product.price}</div>
          <button
            className="btn modern-addcart-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
          >
            <FaShoppingCart style={{ marginRight: 8 }} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  // MODAL for Product Details
  const ProductModal = () => {
    if (!selectedProduct) return null;
    const shortDescription = selectedProduct.description?.slice(0, 160);
    const shouldTruncate = selectedProduct.description?.length > 160;

    return (
      <div
        className="modal fade show d-block modern-modal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.42)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-4">
            <div className="modal-header border-0">
              <h5 className="modal-title">
                {selectedProduct.brand} {selectedProduct.volume}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setSelectedProduct(null);
                  setShowFullDescription(false);
                }}
              ></button>
            </div>
            <div className="modal-body d-flex flex-column flex-md-row gap-4">
              <div className="flex-shrink-0" style={{ maxWidth: "260px" }}>
                <img
                  src={selectedProduct.image || "https://placehold.co/250x300"}
                  alt={selectedProduct.name}
                  className="img-fluid rounded"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="modern-card-title">{selectedProduct.name}</h4>

                  {/* Rating (optional) */}
                  {selectedProduct.rating && (
                    <div className="modern-rating mb-2">
                      <FaStar style={{ color: "#FFB300", fontSize: 16, marginRight: 4 }} />
                      <span>{selectedProduct.rating.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="modern-price">${selectedProduct.price}</div>

                  {/* Description */}
                  <p className="text-muted">
                    {showFullDescription || !shouldTruncate
                      ? selectedProduct.description
                      : `${shortDescription}...`}
                    {shouldTruncate && (
                      <button
                        className="btn btn-link p-0 ms-1"
                        style={{ fontSize: "0.9rem" }}
                        onClick={() => setShowFullDescription(!showFullDescription)}
                      >
                        {showFullDescription ? "Show less" : "See more"}
                      </button>
                    )}
                  </p>

                  {/* Quantity */}
                  <div className="mb-3">
                    <label className="form-label">Quantity:</label>
                    <select
                      className="form-select"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    >
                      {[...Array(10).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Full width Add to Cart button at the bottom */}
                <button
                  className="btn modern-addcart-btn modern-addcart-btn--block mt-auto"
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ProductModal />
      <div className="scroll-wrapper position-relative">
        <button
          className="btn-scroll left modern-scroll-btn"
          onClick={() => scroll("left")}
        >
          <FaChevronLeft />
        </button>
        <button
          className="btn-scroll right modern-scroll-btn"
          onClick={() => scroll("right")}
        >
          <FaChevronRight />
        </button>
        <div className="d-flex gap-3 overflow-auto product-row" ref={scrollRef}>
          {products.length === 0 ? (
            <div
              className="w-100 text-muted text-center py-5"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 18 }}
            >
              No products found.
            </div>
          ) : (
            products.map(renderCard)
          )}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
