import { createContext, useContext, useEffect, useState } from "react";
import { getUsersData } from "../api/apiHandlers.js";

//create context
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });
  const [errors, setErrors] = useState({});

  // request to fetch userList
  useEffect(() => {
    getUsersData()
      .then((res) => {
        setUsers(res?.userData || []);
        setIsAuthenticated(!!res?.success); //Double NOT operator is used to convert any value into boolean - for ex: undefined,null,or nay falsy value - becomes false
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setIsAuthenticated(false);
      });
  }, []);

  console.log("isAuthenticated: ", isAuthenticated);
  return (
    <AuthContext.Provider
      value={{
        users,
        setUsers,
        isAuthenticated,
        setIsAuthenticated,
        email,
        setEmail,
        password,
        setPassword,
        currentUser,
        setCurrentUser,
        form,
        setForm,
        errors,
        setErrors,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook for using context
export const useAuth = () => {
  return useContext(AuthContext);
};

/* 
  useEffect(() => {
    async function fetchData() {
      const {userData,success} = await getUsersData();
      setUsers(userData);    // update the state
      setIsAuthenticated(success);
      console.log("userData: ", userData);
    }
    fetchData();
  }, []);
*/
