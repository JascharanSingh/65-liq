import React from "react";
import { useCart } from "../../context/CartContext";

const CartSidebar = () => {
  const {
    cartItems,
    showCart,
    setShowCart,
    incrementQty,
    decrementQty,
    subtotal,
    clearCart,
  } = useCart();

  const handleWhatsAppCheckout = () => {
    const phone = "3472554826";
    const orderText = cartItems
      .map(
        (item, i) =>
          `${i + 1}. ${item.brand} ${item.volume} - ${item.name} (${item.qty} x $${item.price})`
      )
      .join("\n");

    const finalMessage = encodeURIComponent(
      `Hello, I'd like to place the following order:\n\n${orderText}\n\nTotal: $${subtotal.toFixed(2)}`
    );

    window.open(`https://wa.me/${phone}?text=${finalMessage}`, "_blank");
  };

  return (
    <div
      className="cart-sidebar position-fixed top-0 end-0 h-100"
      style={{
        width: "100%",
        maxWidth: "450px",
        background: "#fefefe",
        padding: "1.5rem",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        transform: showCart ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
        zIndex: 9999,
        overflowY: "auto",
      }}
    >
      <style>{`
        @keyframes fadeInCart {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .cart-sidebar {
            width: 100vw !important;
            padding: 1rem !important;
          }
        }

        .btn-qty:hover {
          background: #e0e0e0 !important;
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 style={{ fontSize: "1.5rem", fontWeight: "700", letterSpacing: "0.5px" }}>
          🛒 Your Cart
        </h5>
        <button className="btn-close" onClick={() => setShowCart(false)} />
      </div>

      {cartItems.length === 0 ? (
        <p className="text-muted mt-4">Your cart is empty.</p>
      ) : (
        <>
          <div className="d-flex flex-column gap-4">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="cart-item"
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  padding: "1rem",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  animation: "fadeInCart 0.3s ease-in-out",
                }}
              >
                <div
                  className="d-flex gap-3"
                  style={{ flexWrap: "wrap", alignItems: "flex-start" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: "contain",
                      borderRadius: 8,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div
                      style={{ fontSize: "1rem", fontWeight: "600", lineHeight: 1.3 }}
                    >
                      {item.brand} {item.volume}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#666" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#888" }}>
                      {item.qty} x ${item.price}
                    </div>

                    <div className="d-flex align-items-center gap-2 mt-2">
                      <button
                        className="btn-qty"
                        onClick={() => decrementQty(item._id, item.volume)}
                        style={{
                          border: "none",
                          background: "#f1f1f1",
                          padding: "6px 10px",
                          borderRadius: "8px",
                          fontSize: "1rem",
                          transition: "0.2s",
                        }}
                      >
                        ➖
                      </button>
                      <span className="fw-semibold">{item.qty}</span>
                      <button
                        className="btn-qty"
                        onClick={() => incrementQty(item._id, item.volume)}
                        style={{
                          border: "none",
                          background: "#f1f1f1",
                          padding: "6px 10px",
                          borderRadius: "8px",
                          fontSize: "1rem",
                          transition: "0.2s",
                        }}
                      >
                        ➕
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      minWidth: 60,
                      fontWeight: "600",
                      textAlign: "right",
                      fontSize: "0.95rem",
                      color: "#111",
                    }}
                  >
                    ${parseFloat(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-4 pt-3"
            style={{ borderTop: "2px solid #eee", marginTop: "1.5rem" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>Total:</span>
              <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="d-flex flex-column gap-2">
              <button
                onClick={handleWhatsAppCheckout}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "10px",
                  padding: "12px",
                  fontSize: "1rem",
                  border: "none",
                  transition: "0.2s",
                }}
              >
                Checkout via WhatsApp
              </button>
              <button
                onClick={clearCart}
                style={{
                  backgroundColor: "white",
                  color: "#dc3545",
                  border: "2px solid #dc3545",
                  fontWeight: "600",
                  borderRadius: "10px",
                  padding: "10px",
                  fontSize: "0.95rem",
                  transition: "0.2s",
                }}
              >
                🗑️ Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;