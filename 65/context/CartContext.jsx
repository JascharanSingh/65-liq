import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // ✅ Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("🛑 Failed to load cart:", e);
      return [];
    }
  });

  const [showCart, setShowCart] = useState(false);

  // ✅ Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (e) {
      console.error("🛑 Failed to save cart:", e);
    }
  }, [cartItems]);

  // ✅ Add or update item in cart
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id && item.volume === product.volume
      );

      if (existing) {
        return prev.map((item) =>
          item._id === existing._id && item.volume === existing.volume
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, qty: quantity }];
      }
    });
  }, []);

  // ✅ Increase quantity
  const incrementQty = useCallback((productId, volume) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId && item.volume === volume
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  }, []);

  // ✅ Decrease quantity or remove
  const decrementQty = useCallback((productId, volume) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === productId && item.volume === volume
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  // ✅ Clear all cart items
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  }, []);

  // ✅ Derived values with memoization
  const totalItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.qty, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cartItems]
  );

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