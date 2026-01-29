import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logout as logoutService } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = getCurrentUser();
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (newToken) => {
        setToken(newToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        logoutService();
        setToken(null);
        setIsAuthenticated(false);
        // Opcional: Redirigir o limpiar otros estados
    };

    const value = {
        token,
        isAuthenticated,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
