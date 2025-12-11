import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import { loginService } from "../../services/authServices";
import "../../styles/Login.css";
import { Helmet } from "react-helmet";

export default function Login() {
  const { setIsAuthenticated, setUser, setIsAdmin } = useAuthContext();
  const { theme } = useThemeContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const { ok, data } = await loginService({ id: 1, email, password });
    if (!ok) {
      setError(data.message || "Error al iniciar sesión");
      return;
    }

    setIsAuthenticated(true);
    setUser({ name: data.user.email.split("@")[0], email: data.user.email });
    setIsAdmin(data.user.role === "admin");

    if (data.user.role === "admin") {
      navigate("/");
    } else {
      navigate(from);
    }
  };


  return (
    <div className={`login-container ${theme}`}>
      <Helmet>
        <title>Login | Mi Tienda</title>
        <meta
          name="description"
          content="Accede a tu cuenta en Mi Tienda para gestionar tus compras y productos."
        />
        <meta name="keywords" content="login, iniciar sesión, tienda, usuario" />
      </Helmet>

      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          ref={emailRef}
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Correo electrónico"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Contraseña"
        />
        <button type="submit" aria-label="Ingresar a la cuenta">
          Ingresar
        </button>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
}