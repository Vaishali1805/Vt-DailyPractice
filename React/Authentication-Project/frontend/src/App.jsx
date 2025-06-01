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
      element: isAuthenticated ? <Navigate to="/userList" /> : <Login />
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/userList" /> : <Login />
    },
    {
      path: "/signup",
      element: isAuthenticated ? <Navigate to="/userList" /> : <Signup />
    },
    {
      path: "/forgotPassword",
      element: isAuthenticated ? <Navigate to="/userList" /> : <Forgotpass />
    },
    {
      path: "/userList",
      element: <UserList />
      // element: isAuthenticated ? <UserList /> : <Navigate to="/login" />
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