import React from "react";
import { useCart } from "../../context/CartContext";

const CartSidebar = () => {
  const { cartItems, showCart, setShowCart, setCartItems } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleRemove = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleWhatsAppCheckout = () => {
    const phone = "3472554826";
    const orderText = cartItems
      .map(
        (item, i) =>
          `${i + 1}. ${item.brand} ${item.volume} - ${item.name} (${item.qty} x $${item.price})`
      )
      .join("\n");

    const finalMessage = encodeURIComponent(
      `Hello, I'd like to place the following order:\n\n${orderText}\n\nTotal: $${total.toFixed(2)}`
    );

    window.open(`https://wa.me/${phone}?text=${finalMessage}`, "_blank");
  };

  return (
    <div
      className="cart-sidebar position-fixed top-0 end-0 h-100 bg-white shadow-lg px-4 pt-4 pb-5"
      style={{
        width: "50vw",
        transform: showCart ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
        zIndex: 9999,
        overflowY: "auto",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="m-0">🛒 Your Cart</h5>
        <button className="btn-close" onClick={() => setShowCart(false)} />
      </div>

      {cartItems.length === 0 ? (
        <p className="text-muted mt-4">Your cart is empty.</p>
      ) : (
        <>
          <div className="d-flex flex-column gap-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="border-bottom pb-3">
                <div className="d-flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 60, height: 60, objectFit: "contain", borderRadius: 8 }}
                  />
                  <div className="flex-grow-1">
                    <div className="fw-semibold" style={{ fontSize: "0.95rem" }}>
                      {item.brand} {item.volume}
                    </div>
                    <div className="text-muted small">{item.name}</div>
                    <div className="text-muted small">{item.qty} x ${item.price}</div>
                  </div>
                  <div className="fw-bold text-end" style={{ minWidth: 60 }}>
                    ${parseFloat(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemove(idx)}
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-top">
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-success w-100 fw-semibold py-2"
              onClick={handleWhatsAppCheckout}
            >
              ✅ Checkout via WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;