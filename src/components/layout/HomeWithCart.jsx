import { useCartContext } from "../../context/CartContext.jsx";
import CartFab from "../cart/CartFab.jsx";
import CartOffcanvas from "../cart/CartOffcanvas.jsx";
import ProductList from "../product/ProductList.jsx";
import Footer from "./Footer.jsx";
import "../../styles/Cart.css";
import { useAuthContext } from "../../context/AuthContext.jsx";

export default function HomeWithCart() {
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
      <ProductList />
      <Footer />

    </>
  );
}