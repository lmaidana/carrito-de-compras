import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Pay() {
  const { cart, emptyCart } = useCartContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const fmtARS = (n) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" })
      .format(Number(n || 0));

  const total = cart.reduce(
    (suma, producto) => suma + producto.precio * (producto.quantity || 1),
    0
  );

  const totalItems = cart.reduce(
    (suma, producto) => suma + (producto.quantity || 1),
    0
  );

  const handlePurchase = () => {
    toast.success("¡Compra realizada con éxito!");
    emptyCart();
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Pagar | Mi Tienda</title>
        <meta
          name="description"
          content="Confirma tu compra y realiza el pago de tus productos en Mi Tienda."
        />
        <meta name="keywords" content="pago, checkout, carrito, tienda" />
      </Helmet>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Datos del comprador</h5>
          <p><strong>{user.name}</strong></p>
          <p>Email: {user.email}</p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Tu compra</h5>

          {cart.length > 0 ? (
            <>
              <ul className="list-group list-group-flush mb-3">
                {cart.map((producto) => (
                  <li
                    key={producto.id}
                    className="list-group-item d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={producto.avatar}
                        alt={`Imagen del producto ${producto.nombre}`}
                        width="60"
                        className="rounded"
                      />
                      <div>
                        <span className="fw-bold">{producto.nombre}</span>
                        <div className="text-muted small">
                          Cantidad: {producto.quantity || 1}
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <div>{fmtARS(producto.precio)} c/u</div>
                      <strong>{fmtARS(producto.precio * (producto.quantity || 1))}</strong>
                    </div>
                  </li>
                ))}
              </ul>
              <h5 className="text-end">
                Total ({totalItems} {totalItems === 1 ? "producto" : "productos"}): {fmtARS(total)}
              </h5>
            </>
          ) : (
            <p>No hay productos en el carrito</p>
          )}
        </div>
      </div>

      <div className="d-flex gap-2">
        {cart.length > 0 && (
          <button
            className="btn btn-success"
            onClick={handlePurchase}
            aria-label="Confirmar compra y pagar"
          >
            Confirmar y Pagar
          </button>
        )}
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/")}
          aria-label={cart.length > 0 ? "Seguir comprando" : "Volver a productos"}
        >
          {cart.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
        </button>
      </div>
    </div>
  );
}