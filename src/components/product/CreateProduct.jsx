import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productService";
import { toast } from "react-toastify";
import { ErrorType } from "../../utils/errorTypes";
import { Messages } from "../../utils/messages";
import ProductForm from "../ui/ProductForm";
import { Helmet } from "react-helmet";

const CreateProduct = () => {
  const navigate = useNavigate();

  const handleCreate = async (product) => {
    try {
      await createProduct(product);
      toast.success(Messages.PRODUCT_CREATED);
      setTimeout(() => navigate("/"), 3000);
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

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Crear producto | Mi Tienda</title>
        <meta
          name="description"
          content="Agrega un nuevo producto al catálogo de Mi Tienda."
        />
        <meta name="keywords" content="crear producto, catálogo, tienda" />
      </Helmet>

      <h2>Crear Producto</h2>
      <ProductForm onSubmit={handleCreate} submitLabel="Crear producto" />
    </div>
  );
};

export default CreateProduct;