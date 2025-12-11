import { useEffect } from "react";
import Layout from '../src/components/layout/Layout.jsx';
import Navbar from './components/layout/Navbar.jsx';
import { useAuthContext } from './context/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import { checkSessionService } from "./services/authServices.jsx";
import NotificationProvider from "./components/ui/NotificationProvider.jsx";
export default function App() {

  const { setIsAuthenticated, isAuthenticated, user, setUser } = useAuthContext();

    useEffect(() => {
    const verifySession = async () => {
      const { ok, data } = await checkSessionService();
      if (ok) {
        setIsAuthenticated(true);
        setUser(data.user); // mirar q me devuelve el back
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };  
    verifySession();
  }, []); 

  return (
    <>
      <Navbar />
      <Layout>
          <AppRoutes />
      </Layout>
      <NotificationProvider />
    </>
  );
}