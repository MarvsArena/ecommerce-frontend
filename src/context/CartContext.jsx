import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);
const storageKey = "omd-hairville-cart";

const readStoredCart = () => {
  try {
    const storedCart = localStorage.getItem(storageKey);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    localStorage.removeItem(storageKey);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(readStoredCart);

  const persist = (items) => {
    localStorage.setItem(storageKey, JSON.stringify(items));
    setCartItems(items);
  };

  const addToCart = (product, quantity = 1) => {
    const existing = cartItems.find((item) => item._id === product._id);

    if (existing) {
      persist(
        cartItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item,
        ),
      );
      return;
    }

    persist([...cartItems, { ...product, quantity }]);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      persist(cartItems.filter((item) => item._id !== productId));
      return;
    }

    persist(
      cartItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item,
      ),
    );
  };

  const removeFromCart = (productId) => {
    persist(cartItems.filter((item) => item._id !== productId));
  };

  const clearCart = () => persist([]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      cartItems,
      subtotal,
      totalItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cartItems, subtotal, totalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
