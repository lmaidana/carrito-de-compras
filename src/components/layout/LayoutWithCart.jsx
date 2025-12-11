import { useCartContext } from "../../context/CartContext.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";
import CartFab from "../cart/CartFab.jsx";
import CartOffcanvas from "../cart/CartOffcanvas.jsx";
import "../../styles/Cart.css";

export default function LayoutWithCart({ children }) {
  const { totalItems } = useCartContext();
  const { isAdmin } = useAuthContext();

  return (
    <>
      {!isAdmin && (
        <>
          <CartFab totalItems={totalItems} />
          <CartOffcanvas />
        </>
      )}
      {children}
    </>
  );
}