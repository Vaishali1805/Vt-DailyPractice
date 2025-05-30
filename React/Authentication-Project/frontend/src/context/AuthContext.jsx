import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";

//create context
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    //reques to check token
    // useEffect(() => {
    //     const verifyAuth = async () => {
    //         try {
    //             const response = await AxiosInstance.get("/auth/checkToken");
    //             setIsAuthenticated(response.data.success);
    //         } catch (error) {
    //             console.error("Error checking authentication:", error);
    //             setIsAuthenticated(false);
    //         }
    //     };
    //     verifyAuth();
    // }, []);
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