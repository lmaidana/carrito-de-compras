import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import { loginService } from "../../services/authServices";
import "../../styles/Login.css";

export default function Login() {
  const { setIsAuthenticated, setUser } = useAuthContext();
  const { theme } = useThemeContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { ok, data } = await loginService({ id: 1, email, password });

    if (!ok) {
      setError(data.message || "Error al iniciar sesión");
      return;
    }

    setIsAuthenticated(true);
    setUser({ name: "Usuario", email });
    navigate("/");
  };

  return (
    <div className={`login-container ${theme}`}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}