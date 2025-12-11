import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';
import { logoutService } from '../../services/authServices';
import '../../styles/Navbar.css';
import ThemeToggleButton from '../ui/ThemeToggleButton';
import { useRef } from 'react';
import { Modal } from 'bootstrap';
import ConfirmModal from '../ui/ConfirmModal';

const Navbar = () => {
  const { theme } = useThemeContext();
  const { isAuthenticated, signOut } = useAuthContext();
  const navigate = useNavigate();

  const modalRef = useRef(null);

  const openLogoutModal = () => {
    if (!modalRef.current) return;
    const modal = Modal.getInstance(modalRef.current) || new Modal(modalRef.current, { focus: false });
    modal.show();
  };

  const confirmLogout = async () => {
    const { ok } = await logoutService();

    if (ok) {
      signOut();
      navigate("/");
    } else {
      alert("Hubo un problema al cerrar sesión");
    }

    if (modalRef.current) {
      const modal = Modal.getInstance(modalRef.current);
      modal.hide();
    }
  };

  return (
    <>
      <nav className={`navbar ${theme}`}>
        <div className="logo">Mi e-Commerce 🛍️</div>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/contacto">Contacto</Link>
          {!isAuthenticated ? (
            <Link to="/login">Iniciar sesión</Link>
          ) : (
            <Link to="/" onClick={(e) => { e.preventDefault(); openLogoutModal(); }}>
              Cerrar sesión
            </Link>
          )}
        </div>
        <ThemeToggleButton />
      </nav>
      <ConfirmModal
        ref={modalRef}
        title="Confirmar cierre de sesión"
        message="¿Estás seguro que querés cerrar sesión?"
        confirmLabel="Cerrar sesión"
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Navbar;