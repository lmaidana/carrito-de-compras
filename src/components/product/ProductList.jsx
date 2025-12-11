import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { fetchProducts, deleteProduct } from "../../services/productService";
import { toast } from "react-toastify";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import SearchBar from "../ui/SearchBar.jsx";
import Pagination from "../ui/Pagination.jsx";
import { ErrorType } from "../../utils/errorTypes";
import { Messages } from "../../utils/messages";
import { Modal } from "bootstrap";
import { CartButton } from "../ui/Buttons.jsx";
import ConfirmModal from "../ui/ConfirmModal.jsx";
import { Helmet } from "react-helmet";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isAdmin } = useAuthContext();
  const navigate = useNavigate();

  // búsqueda
  const [queryInput, setQueryInput] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  // paginación
  const PAGE_SIZE = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));

  const { addToCart } = useCartContext();

  // modal para eliminar
  const modalRef = useRef(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // cargar productos
  useEffect(() => {
    fetchProducts()
      .then((res) => setProducts(res))
      .catch((err) => {
        if (err.type === ErrorType.NETWORK_ERROR) {
          setError("Eliminaron todos los productos ó debes verificar la conexión con la API");
        } else {
          setError("Hubo un problema al cargar los productos.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // debounce búsqueda
  useEffect(() => {
    const t = setTimeout(() => {
      const q = queryInput.trim().toLowerCase();
      setQuery(q);
    }, 250);
    return () => clearTimeout(t);
  }, [queryInput]);

  // sync desde URL
  useEffect(() => {
    const p = Number(searchParams.get("page") || 1);
    if (!Number.isFinite(p) || p <= 0) return;
    if (p !== page) setPage(p);
  }, [searchParams]);

  // categorías
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach(p => { if (p.categoria) set.add(p.categoria); });
    return Array.from(set).sort();
  }, [products]);

  // filtrado
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesName =
        !query || String(p.nombre || "").toLowerCase().includes(query);
      const matchesCategory =
        !category || String(p.categoria || "").toLowerCase() === category.toLowerCase();
      return matchesName && matchesCategory;
    });
  }, [products, query, category]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set("page", "1");
        return next;
      });
    }
  }, [query, category]);

  useEffect(() => {
    const total = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
    if (page > total) {
      const newPage = total;
      setPage(newPage);
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set("page", String(newPage));
        return next;
      });
    }
  }, [filteredProducts.length, page, setSearchParams]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const startIdx = (clampedPage - 1) * PAGE_SIZE;
  const pageItems = filteredProducts.slice(startIdx, startIdx + PAGE_SIZE);

  const fmtARS = (n) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" })
      .format(Number(n || 0));

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.nombre} agregado al carrito`, {
      position: "top-right",
      autoClose: 1000,
    });
    const live = document.getElementById("sr-live");
    if (live) live.textContent = `${product.nombre} agregado al carrito`;
  };

  const openDeleteModal = (id) => {
    setSelectedProductId(id);
    if (!modalRef.current) return;
    const modal = Modal.getInstance(modalRef.current) || new Modal(modalRef.current, { focus: false });
    modal.show();
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;
    try {
      await deleteProduct(selectedProductId);
      toast.success(Messages.PRODUCT_DELETED);
      setProducts(prev => prev.filter(p => p.id !== selectedProductId));
    } catch (err) {
      switch (err.type) {
        case ErrorType.SESSION_EXPIRED:
          toast.error(Messages.SESSION_EXPIRED);
          setTimeout(() => navigate("/login"), 3000);
          break;
        default:
          toast.error(Messages.UNKNOWN_ERROR);
      }
    }
    if (modalRef.current) {
      const modal = Modal.getInstance(modalRef.current);
      modal.hide();
    }
  };

  const handlePageChange = (nextPage) => {
    const total = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
    const desired = Math.min(Math.max(nextPage, 1), total);
    if (desired === page) return;

    setPage(desired);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set("page", String(desired));
      return next;
    });

    const listTop = document.getElementById("productListTop");
    listTop?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <i className="bi bi-arrow-repeat"
          style={{ fontSize: "3rem", animation: "spin 1s linear infinite", display: "inline-block" }} />
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Mi Tienda | Verduleria</title>
        <meta
          name="description"
          content="Explora nuestro catálogo de productos disponibles en Mi Tienda."
        />
        <meta name="keywords" content="productos, catálogo, tienda, compras" />
      </Helmet>
      <div id="productListTop" tabIndex="-1" />
      <SearchBar
        query={queryInput}
        category={category}
        categories={categories}
        onQueryChange={setQueryInput}
        onCategoryChange={setCategory}
      />
      <div className="d-flex justify-content-between align-items-center mb-2">
        <small className="text-muted">
          {filteredProducts.length === 0
            ? "Sin resultados"
            : `Mostrando ${startIdx + 1}–${Math.min(startIdx + PAGE_SIZE, filteredProducts.length)} de ${filteredProducts.length} productos`}
        </small>
        {isAdmin && (
          <Link to="/productos/crear" className="btn btn-success" aria-label="Crear nuevo producto">
            + Nuevo producto
          </Link>
        )}
      </div>
      <div className="row">
        {pageItems.length === 0 ? (
          <div className="col-12">
            <div className="text-center p-5">
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
              <h5>No hay resultados</h5>
              <p>Probá con otro nombre o categoría.</p>
            </div>
          </div>
        ) : (
          pageItems.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                {product.avatar && (
                  <Link to={`/products/${product.id}`} state={{ product }}>
                    <img
                      src={product.avatar}
                      alt={`Imagen del producto ${product.nombre}`}
                      className="card-img-top"
                    />
                  </Link>
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.nombre}</h5>
                  <p className="card-text">{product.descripcion || "Sin descripción"}</p>
                  <p className="card-text">
                    <span className="badge text-bg-secondary">{product.categoria || "General"}</span>
                  </p>
                  <p className="card-text fw-bold">Precio: {fmtARS(product.precio)}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  {isAdmin ? (
                    <>
                      <Link
                        to={`/productos/editar/${product.id}`}
                        className="btn btn-warning"
                        aria-label={`Editar producto ${product.nombre}`}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => openDeleteModal(product.id)}
                        aria-label={`Eliminar producto ${product.nombre}`}
                      >
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <>
                      <CartButton
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Agregar ${product.nombre} al carrito`}
                      >
                        <FaShoppingCart /> Agregar
                      </CartButton>
                      <Link
                        to={`/products/${product.id}`}
                        state={{ product }}
                        className="btn btn-primary d-flex align-items-center gap-2"
                        aria-label={`Ver detalle del producto ${product.nombre}`}
                      >
                        <FaInfoCircle /> Ver detalle
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {isAdmin && (
        <div className="d-flex justify-content-end mt-3">
          <Link to="/productos/crear" className="btn btn-success" aria-label="Crear nuevo producto">
            + Nuevo producto
          </Link>
        </div>
      )}
      <Pagination
        page={clampedPage}
        totalPages={totalPages}
        onChange={handlePageChange}
        maxNumbers={5}
      />
      <ConfirmModal
        ref={modalRef}
        title="Eliminar producto"
        message="¿Estás seguro que querés eliminar este producto?"
        confirmLabel="Eliminar"
        onConfirm={confirmDelete}
      />
    </div>
  );
}