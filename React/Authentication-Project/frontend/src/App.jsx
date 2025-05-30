import { useState } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Forgotpass from './pages/Forgotpass.jsx'
import UserList from './pages/userList.jsx'
import {createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AuthProvider,{ useAuth } from "./context/AuthContext.jsx";

function AppContent() {
  const {isAuthenticated} = useAuth();
  console.log("isAuthenticated: ",isAuthenticated);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/forgotPassword",
      element: <Forgotpass />
    },
    {
      path: "/userList",
      element: <UserList />
    },
  ]);

  return <RouterProvider router={router} />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App