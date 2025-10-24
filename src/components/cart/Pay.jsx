import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";

export default function Pay() {
  const { cart, emptyCart } = useCartContext();
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();

  const total = cart.reduce(
    (suma, producto) => suma + Number(producto.precio),
    0
  );

  const handlePurchase = () => {
    alert("¡Compra realizada con éxito!");
    emptyCart();
    navigate("/");
  };

  return (
    <div>
      <div>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <hr />
      </div>
      <div>
        <h2>Tu compra:</h2>

        {cart.length > 0 ? (
          <>
            {cart.map((producto) => (
              <div key={producto.id}>
                <img src={producto.avatar} alt={producto.nombre} width="60" />
                <span>{producto.nombre}</span>
                <strong>${producto.precio}</strong>
              </div>
            ))}
            <h3>Total a pagar: ${total}</h3>
          </>
        ) : (
          <p>No hay productos en el carrito</p>
        )}
      </div>
      
      <div>
        {cart.length > 0 && (
          <button onClick={handlePurchase}>Confirmar y Pagar</button>
        )}
        <button onClick={() => navigate("/")}>
          {cart.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
        </button>
      </div>
    </div>
  );
}