// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // ✅ Load cart from localStorage on first render
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage:", e);
      return [];
    }
  });

  const [showCart, setShowCart] = useState(false);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [cartItems]);

  // ✅ Add to cart or update existing item
  const addToCart = (product, quantity = 1) => {
    const existing = cartItems.find(
      (item) => item._id === product._id && item.volume === product.volume
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
      setCartItems((prev) => [...prev, { ...product, qty: quantity }]);
    }
  };

  // ✅ Increment item quantity
  const incrementQty = (productId, volume) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId && item.volume === volume
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // ✅ Decrement item quantity or remove if qty = 0
  const decrementQty = (productId, volume) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === productId && item.volume === volume
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // ✅ Remove all items from cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // ✅ Total quantity and subtotal
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        incrementQty,
        decrementQty,
        clearCart,
        showCart,
        setShowCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};