import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { verifyAuth } from "../api/apiHandlers.js";

//create context
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // request to check token
  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await verifyAuth();
      setIsAuthenticated(isValid);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,email,setEmail,password,setPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook for using context
export const useAuth = () => {
  return useContext(AuthContext);
};