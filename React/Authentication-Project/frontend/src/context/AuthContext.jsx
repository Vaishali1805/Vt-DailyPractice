import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";
import { verifyAuth } from '../api/apiHandlers.js'

//create context
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    // request to check token
    useEffect(() => {
        const checkAuth = async () => {
            const isValid = await verifyAuth(); // e.g. returns true/false
            setIsAuthenticated(isValid); // or set data based on response
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom Hook for using context
export const useAuth = () => {
    return useContext(AuthContext);
};