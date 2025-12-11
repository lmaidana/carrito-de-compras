import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById, deleteProduct } from "../../services/productService";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { ErrorType } from "../../utils/errorTypes";
import { Messages } from "../../utils/messages";
import { CartButton } from "../ui/Buttons";
import { Helmet } from "react-helmet";
import CartFab from "../cart/CartFab.jsx";
import CartOffcanvas from "../cart/CartOffcanvas.jsx";
import "../../styles/Cart.css";

const AUTO_CLOSE_MS = 3000;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuthContext();
  const { addToCart, totalItems } = useCartContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then(setProduct)
      .catch((err) => {
        console.error("Error al obtener el producto:", err);
        setError("No se pudo cargar el producto.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const fmtARS = (n) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" })
      .format(Number(n || 0));

  const handleNextProduct = () => {
    const nextId = parseInt(id) + 1;
    navigate(`/products/${nextId}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro que querés eliminar este producto?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      toast.success(Messages.PRODUCT_DELETED);
      navigate("/");
    } catch (err) {
      switch (err.type) {
        case ErrorType.SESSION_EXPIRED:
          toast.error(Messages.SESSION_EXPIRED);
          setTimeout(() => navigate("/login"), AUTO_CLOSE_MS);
          break;
        default:
          toast.error(Messages.UNKNOWN_ERROR);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <i
          className="bi bi-arrow-repeat"
          style={{ fontSize: "3rem", animation: "spin 1s linear infinite" }}
        ></i>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error || "Producto no disponible"}</div>
        <Link to="/" className="btn btn-secondary">
          Volver a Productos
        </Link>
      </div>
    );
  }

  return (
    <>
      {!isAdmin && (
        <>
          <CartFab totalItems={totalItems} />
          <CartOffcanvas />
        </>
      )}

      <div className="container mt-4">
        <Helmet>
          <title>{product ? `${product.nombre} | Mi Tienda` : "Producto | Mi Tienda"}</title>
          <meta
            name="description"
            content={product?.descripcion || "Detalles del producto en Mi Tienda"}
          />
          <meta name="keywords" content={product?.categoria || "productos"} />
          <meta property="og:title" content={product?.nombre || "Producto | Mi Tienda"} />
          <meta property="og:description" content={product?.descripcion || "Detalles del producto"} />
          <meta property="og:image" content={product?.avatar} />
        </Helmet>

        <h2 className="mb-4">Detalles del Producto</h2>
        <div className="card shadow-sm">
          <div className="row g-0">
            <div className="col-md-5">
              <img
                src={product.avatar}
                alt={`Imagen del producto ${product.nombre}`}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h3 className="card-title">{product.nombre}</h3>
                <p className="card-text">
                  <strong>Descripción:</strong>{" "}
                  {product.descripcion || "Sin descripción"}
                </p>
                <p className="card-text">
                  <strong>Precio:</strong> {fmtARS(product.precio)}
                </p>
                <p className="card-text">
                  <span className="badge bg-secondary">
                    {product.categoria || "General"}
                  </span>
                </p>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  <CartButton
                    as={Link}
                    to="/"
                    $variant="secondary"
                    className="flex-fill"
                    aria-label="Volver a la lista de productos"
                  >
                    Volver
                  </CartButton>
                  <CartButton
                    $variant="primary"
                    onClick={handleNextProduct}
                    className="flex-fill"
                    aria-label="Ver siguiente producto"
                  >
                    Ver siguiente producto
                  </CartButton>
                  {isAdmin ? (
                    <>
                      <CartButton
                        as={Link}
                        to={`/productos/editar/${product.id}`}
                        $variant="warning"
                        className="flex-fill"
                        aria-label="Editar producto"
                      >
                        Editar
                      </CartButton>

                      <CartButton
                        $variant="danger"
                        onClick={handleDelete}
                        className="flex-fill"
                        aria-label="Eliminar producto"
                      >
                        Eliminar
                      </CartButton>
                    </>
                  ) : (
                    <CartButton
                      $variant="success"
                      onClick={() => {
                        addToCart(product);
                        toast.success(`${product.nombre} agregado al carrito`);
                      }}
                      className="flex-fill"
                      aria-label="Agregar producto al carrito"
                    >
                      Agregar al carrito
                    </CartButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;