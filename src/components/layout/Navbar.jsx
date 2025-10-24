import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';
import { logoutService } from '../../services/authServices';
import '../../styles/Navbar.css';
import ThemeToggleButton from '../ui/ThemeToggleButton';

const Navbar = () => {
  const { theme } = useThemeContext();
  const { isAuthenticated, user, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("¿Estás seguro que querés cerrar sesión?");
    if (!confirmLogout) return;

    const { ok } = await logoutService();

    if (ok) {
      signOut();
      navigate("/");
    } else {
      alert("Hubo un problema al cerrar sesión");
    }
  };


  return (
    <nav className={`navbar ${theme}`}>
      <div className="logo">Mi e-Commerce 🛍️</div>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/servicios">Servicios</Link>
        <Link to="/contacto">Contacto</Link>
        {!isAuthenticated ? (
          <Link to="/login">Iniciar sesión</Link>
        ) : (
            <Link to="/" onClick={handleLogout}>Cerrar sesión</Link>
        )}&nbsp;
      </div>
      <ThemeToggleButton />
    </nav>
  );
};

export default Navbar;