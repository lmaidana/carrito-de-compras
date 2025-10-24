import { createContext, useContext, useState } from "react";
import { useCartContext } from "./CartContext";

export const AuthContext = createContext();

export function AuthProvider ({children}) {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({name: "", email: ""});

    const { emptyCart } = useCartContext();

    const signOut = () => {
        setIsAuthenticated(false);
        setUser({name: "", email: ""});
        emptyCart();
    }
 
    const value = {
        isAuthenticated,
        setIsAuthenticated,
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