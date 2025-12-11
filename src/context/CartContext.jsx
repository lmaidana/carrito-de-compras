
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return Array.isArray(action.payload) ? action.payload : [];
    case "ADD": {
      const product = action.payload;
      const idx = state.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        const next = [...state];
        next[idx] = { ...next[idx], quantity: (next[idx].quantity || 1) + 1 };
        return next;
      }
      return [...state, { ...product, quantity: 1 }];
    }
    case "DECREASE": {
      const id = action.payload;
      return state
        .map((i) => (i.id === id ? { ...i, quantity: (i.quantity || 1) - 1 } : i))
        .filter((i) => (i.quantity || 0) > 0);
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.id !== action.payload);
    case "EMPTY":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Inicializar desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        dispatch({ type: "INIT", payload: JSON.parse(raw) });
      }
    } catch {}
  }, []);

  // Persistir en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product) => dispatch({ type: "ADD", payload: product });
  const decreaseItem = (id) => dispatch({ type: "DECREASE", payload: id });
  const removeItemFromCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const emptyCart = () => dispatch({ type: "EMPTY" });

  const totalItems = useMemo(
    () => cart.reduce((acc, i) => acc + (i.quantity || 1), 0),
    [cart]
  );
  const subtotal = useMemo(
    () => cart.reduce((acc, i) => acc + Number(i.precio || 0) * (i.quantity || 1), 0),
    [cart]
  );
  const fmtARS = (n) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(Number(n || 0));
  const subtotalARS = useMemo(() => fmtARS(subtotal), [subtotal]);

  const value = {
    cart,
    addToCart,
    decreaseItem,
    removeItemFromCart,
    emptyCart,
    totalItems,
    subtotal,
    subtotalARS,
    fmtARS,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext debe usarse dentro de CartProvider");
  return ctx;
}
