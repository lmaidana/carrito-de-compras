import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext.jsx";
import '../../styles/Cart.css';


export default function Cart() {
    const {cart, emptyCart} = useCartContext();

    const handleEmptyCart = () => {
        const confirm = window.confirm("¿Está seguro que quiere vaciar el acrrito?")
        if (confirm){
            emptyCart();
        }
    }

    const navigate = useNavigate();

    const goPay = () => {
        navigate("/pagar", { state: { cart } });
    };

    return (
    <div className="cart-container">
      <h2>Carrito 🛒</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.nombre} - ${Number(item.precio).toFixed(3)}
            </li>
          ))}
        </ul>
        <button onClick={handleEmptyCart} className="cart-button">Vaciar carrito</button>
        <button onClick={goPay} className="cart-button">Pagar</button>
        </>
      )}
    </div>
  );
}