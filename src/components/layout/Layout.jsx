import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext.jsx';
import '../../styles/Layout.css';

export default function Layout({ children }) {
  const { isAuthenticated, user } = useAuthContext();
  const location = useLocation();

  const titles = {
    '/': 'Listado de productos',
    '/servicios': 'Servicios que ofrecemos en este e-commerce',
    '/contacto': '¿Tenés dudas? Hablemos.',
  };

  return (
    <div className="layout">
      {isAuthenticated && location.pathname === '/' && (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <h3>Hola, {user.name} 👋</h3>
        </div>
      )}
      <header className="layout-header">
        <h2>{titles[location.pathname]}</h2>
      </header>
      <main id="appMain" className="layout-main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}