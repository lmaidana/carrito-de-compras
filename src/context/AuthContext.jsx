import { createContext, useContext, useState } from "react";
import { useCartContext } from "./CartContext";
import { useEffect } from "react";
import { checkSessionService } from "../services/authServices";

export const AuthContext = createContext();

export function AuthProvider ({children}) {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({name: "", email: ""});

    const { emptyCart } = useCartContext();

    useEffect(() => {
    const verifySession = async () => {
        const { ok, data } = await checkSessionService();
        if (ok) {
        setIsAuthenticated(true);
        setUser(data.user);

        // calcular tiempo hasta exp
        const now = Date.now();
        const expMs = data.user.exp * 1000; // exp viene en segundos, convierto
        const timeLeft = expMs - now;

        if (timeLeft > 0) {
            setTimeout(() => {
            setIsAuthenticated(false);
            setUser(null);
            }, timeLeft);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
        } else {
        setIsAuthenticated(false);
        setUser(null);
        }
    };

    verifySession();
    }, []);


    const signOut = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser({name: "", email: ""});
        emptyCart();
    }
 
    const value = {
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        user,
        setUser,
        signOut
    };

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}