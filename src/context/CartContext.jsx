import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const emptyCart = () => {
    setCart([]);
  };

  const removeItemFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const value = {
    cart,
    addToCart,
    emptyCart,
    removeItemFromCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}