import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext.jsx";
import { CartButton, IconButton } from "../ui/Buttons.jsx";
import { Offcanvas, Modal } from "bootstrap";
import { toast } from "react-toastify";

export default function CartOffcanvas() {
  const {
    cart,
    addToCart,
    decreaseItem,
    removeItemFromCart,
    emptyCart,
    subtotalARS,
    fmtARS,
  } = useCartContext();

  const navigate = useNavigate();
  const modalRef = useRef(null);

  const getOffcanvasEl = () => document.getElementById("cartOffcanvas");
  const getOffcanvasInstance = () => {
    const el = getOffcanvasEl();
    return el ? (Offcanvas.getInstance(el) || new Offcanvas(el)) : null;
  };

  const cleanupBootstrapOverlays = () => {
    document.querySelectorAll(".offcanvas-backdrop").forEach(el => el.remove());
    document.body.classList.remove("offcanvas-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  };

  const focusMain = () => {
    const main = document.getElementById("appMain");
    if (main) {
      const firstInteractive = main.querySelector("button, a, input, [tabindex]:not([tabindex='-1'])");
      if (firstInteractive) {
        firstInteractive.focus();
      } else {
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
        main.removeAttribute("tabindex");
      }
    }
  };

  const openConfirmEmpty = () => {
    if (!modalRef.current) return;
    const modal = Modal.getInstance(modalRef.current) || new Modal(modalRef.current, { focus: false });
    modal.show();
  };

  const confirmEmpty = () => {
    emptyCart();
    toast.info("Carrito vaciado correctamente", {
      position: "top-right",
      autoClose: 3000,
    });

    if (modalRef.current) {
      const modal = Modal.getInstance(modalRef.current) || new Modal(modalRef.current, { focus: false });
      modal.hide();
    }

    const offcanvasEl = getOffcanvasEl();
    if (offcanvasEl) {
      const off = Offcanvas.getInstance(offcanvasEl) || new Offcanvas(offcanvasEl);
      const onHidden = () => {
        offcanvasEl.removeEventListener("hidden.bs.offcanvas", onHidden);
        focusMain();
      };
      offcanvasEl.addEventListener("hidden.bs.offcanvas", onHidden, { once: true });
      off.hide();
    } else {
      focusMain();
    }
  };

  const handleGoPay = () => {
    const offcanvas = getOffcanvasInstance();
    const offcanvasEl = getOffcanvasEl();

    const proceed = () => {
      offcanvasEl?.removeEventListener("hidden.bs.offcanvas", proceed);
      offcanvas?.dispose();
      cleanupBootstrapOverlays();

      navigate("/pagar", { state: { cart } });

      setTimeout(() => {
        const loginInput = document.querySelector("input[type='email']");
        loginInput?.focus();
      }, 50);
    };

    if (offcanvas && offcanvasEl) {
      offcanvasEl.addEventListener("hidden.bs.offcanvas", proceed, { once: true });
      offcanvas.hide();
    } else {
      cleanupBootstrapOverlays();
      navigate("/pagar", { state: { cart } });
      setTimeout(() => {
        const loginInput = document.querySelector("input[type='email']");
        loginInput?.focus();
      }, 50);
    }
  };

  useEffect(() => {
    const offcanvasEl = getOffcanvasEl();
    if (!offcanvasEl) return;

    const handleHidden = () => {
      focusMain();
    };

    offcanvasEl.addEventListener("hidden.bs.offcanvas", handleHidden);
    return () => {
      offcanvasEl.removeEventListener("hidden.bs.offcanvas", handleHidden);
    };
  }, []);

  useEffect(() => {
    return () => {
      const offcanvas = getOffcanvasInstance();
      offcanvas?.dispose();
      cleanupBootstrapOverlays();
    };
  }, []);

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvasLabel"
        data-bs-scroll="true"
        data-bs-backdrop="true"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="cartOffcanvasLabel">
            Carrito 🛒
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column">
          {cart.length === 0 ? (
            <p className="text-muted mb-0">El carrito está vacío</p>
          ) : (
            <>
              <ul className="list-group list-group-flush flex-grow-1 overflow-auto">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex align-items-center justify-content-between"
                  >
                    <div className="me-2">
                      <div className="fw-semibold">{item.nombre}</div>
                      <small className="text-muted">
                        {fmtARS(item.precio)} x {item.quantity} ={" "}
                        <strong>
                          {fmtARS(Number(item.precio) * (item.quantity || 1))}
                        </strong>
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <IconButton onClick={() => decreaseItem(item.id)} title="Restar">
                        <i className="bi bi-dash-lg" aria-hidden="true" />
                        <span className="visually-hidden">Restar</span>
                      </IconButton>
                      <span className="px-2">{item.quantity || 1}</span>
                      <IconButton onClick={() => addToCart(item)} title="Sumar">
                        <i className="bi bi-plus-lg" aria-hidden="true" />
                        <span className="visually-hidden">Sumar</span>
                      </IconButton>
                      <IconButton $variant="danger" onClick={() => removeItemFromCart(item.id)} title="Eliminar">
                        <i className="bi bi-trash" aria-hidden="true" />
                        <span className="visually-hidden">Eliminar</span>
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-3 border-top pt-3">
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Subtotal</span>
                  <span>{subtotalARS}</span>
                </div>
              </div>

              <div className="mt-3 d-flex gap-2">
                <CartButton $variant="secondary" onClick={openConfirmEmpty}>
                  <i className="bi bi-trash" aria-hidden="true" /> Vaciar
                </CartButton>
                <CartButton $variant="primary" onClick={handleGoPay} style={{ flexGrow: 1 }}>
                  <i className="bi bi-credit-card" aria-hidden="true" /> Pagar
                </CartButton>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="modal fade" tabIndex="-1" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Vaciar carrito</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              ¿Estás seguro que querés vaciar el carrito?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmEmpty}
              >
                Vaciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}