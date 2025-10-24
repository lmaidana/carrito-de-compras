import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { fetchProducts } from "../../services/productService";
import '../../styles/ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCartContext();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Hubo un problema al cargar los productos."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <i className="bi bi-arrow-repeat" style={{
          fontSize: "3rem",
          animation: "spin 1s linear infinite",
          display: "inline-block"
        }}></i>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>⚠️</div>
        <h2>{error}</h2>
        <p>Verificá tu conexión o intentá más tarde.</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🤔</div>
        <h2>No se encontraron productos</h2>
        <p>Volvé más tarde o recargá la página.</p>
      </div>
    );
  }

  return (
    <ul className="product-list-grid">
      {products.map((product, index) => (
        <li key={product.id} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="product-content">
            <h2>{product.nombre}</h2>
            <p className="product-description">{product.descripcion || "Sin descripción"}</p>
            <p>Precio: ${product.precio}</p>
            {product.avatar && (
              <Link to={`/products/${product.id}`} state={{ product }}>
                <img
                  src={product.avatar}
                  alt={product.nombre}
                  className="product-image-clickable"
                />
              </Link>
            )}
          </div>
          <div className="product-actions">
            <button className="cart-button" onClick={() => addToCart(product)}>
              Agregar al carrito
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}