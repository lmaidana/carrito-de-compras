import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;