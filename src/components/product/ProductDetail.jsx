import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../services/productService";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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


  const handleNextProduct = () => {
    const nextId = parseInt(id) + 1;
    navigate(`/products/${nextId}`);
  };

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
  
  if (error || !product) {
    return (
      <div>
        <p>{error || "Producto no disponible"}</p>
        <Link to="/">
          <button>Volver a Productos</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <h2>Detalles del Producto</h2>
      <div className="product-detail-card">
        <div className="product-image">
          <img src={product.avatar} alt={product.nombre} />
        </div>
        <div className="product-info">
          <h3>{product.nombre}</h3>
          <p><strong>Descripción:</strong> {product.descripcion || "Sin descripción"}</p>
          <p><strong>Precio:</strong> ${product.precio}</p>
          <div className="product-buttons">
            <Link to="/">
              <button className="back-button">Volver</button>
            </Link>
            <button className="next-button" onClick={handleNextProduct}>
              Ver siguiente producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;