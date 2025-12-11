import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../../services/productService";
import { ErrorType } from "../../utils/errorTypes";
import { Messages } from "../../utils/messages";
import { toast } from "react-toastify";
import ProductForm from "../ui/ProductForm";
import { Helmet } from "react-helmet";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductById(id)
      .then((product) => setInitialValues(product))
      .catch(() => setError("No se pudo cargar el producto."));
  }, [id]);

  const handleUpdate = async (product) => {
    try {
      await updateProduct(id, product);
      toast.success(Messages.PRODUCT_UPDATED);
      setTimeout(() => navigate(`/products/${id}`), 3000);
    } catch (err) {
      switch (err.type) {
        case ErrorType.SESSION_EXPIRED:
          toast.error(Messages.SESSION_EXPIRED);
          setTimeout(() => navigate("/login"), 3000);
          break;
        case ErrorType.VALIDATION_ERROR:
          toast.warn(Messages.VALIDATION_ERROR);
          break;
        default:
          toast.error(Messages.UNKNOWN_ERROR);
      }
    }
  };

  if (!initialValues) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Editar producto | Mi Tienda</title>
        <meta
          name="description"
          content={`Edita el producto ${initialValues.nombre} en Mi Tienda.`}
        />
        <meta name="keywords" content="editar producto, catálogo, tienda" />
      </Helmet>

      <h2>Editar Producto</h2>
      <ProductForm
        initialValues={initialValues}
        onSubmit={handleUpdate}
        submitLabel="Guardar cambios"
        error={error}
      />
    </div>
  );
};

export default EditProduct;