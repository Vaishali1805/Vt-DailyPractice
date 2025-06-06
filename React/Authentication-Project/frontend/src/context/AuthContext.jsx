import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorageData } from "../utils/utils.js"

//create context
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

   useEffect(() => {
      async function checkToken() {
        const token = getLocalStorageData("token");
        token ? setIsAuthenticated(true) : setIsAuthenticated(false);
      }
      checkToken();
    }, [isAuthenticated]);

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

// useEffect(() => {
//   getUsersData()
//     .then((res) => {
//       setUsers(res?.userData || []);
//       setCurrentUser(getLocalStorageData("currentUser") || {});
//       setIsAuthenticated(!!res?.success); //Double NOT operator is used to convert any value into boolean - for ex: undefined,null,or nay falsy value - becomes false
//     })
//     .catch((err) => {
//       console.error("Failed to fetch users:", err);
//       setIsAuthenticated(false);
//     });
// }, []);

// setIsAuthenticated(!!res?.success); //Double NOT operator is used to convert any value into boolean - for ex: undefined,null,or nay falsy value - becomes false