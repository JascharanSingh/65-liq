// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

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

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,     // ✅ Exposed for remove functionality
        addToCart,
        showCart,
        setShowCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};