// React hook for side effects
import { useEffect, useState } from "react";

//assets and styles
import cycleImg from "../assets/cycleImage.png";
import formStyles from "../styles/formStyles";

//components
import Button from "../components/Button";
import InputField from "../components/InputField";
import CheckboxWithLabel from "../components/CheckboxWithLabel";
import RightSection from "../components/RightSection";
import ShowToastMessage from "../components/showToastMessage.jsx";

// Import navigation, API call, authentication context, and form validation utility
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../api/apiHandlers.js";
import { useAuth } from "../context/AuthContext.jsx";
import { validateLoginForm } from "../utils/validation.js";
import { setLocalStorageData } from "../utils/utils.js";
import { routes } from "../api/routes.js";

const Login = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    setIsAuthenticated,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to user list page if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      setEmail("");
      setPassword("");
      navigate("/userlist");
    }
  }, [isAuthenticated]);

  // Submit handler for login
  const handleSubmit = async () => {
    //validate login data
    const errors = validateLoginForm(email, password);
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      return;
    }

    //send request to backend 
    const res = await sendRequest({email: email.toLowerCase(), password},routes.login)
    ShowToastMessage(res?.success, res?.message);
    if (res?.success) {
      setLocalStorageData("token",res?.token);
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 1500);
      //await new Promise(resolve => setTimeout(resolve, 3000)); -- also correct
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section: Login Form */}
      <div className="w-1/2 flex flex-col justify-center p-10 bg-white">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome</h1>
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">
          Log in to access the users list and manage users
        </h2>
        <p className="text-gray-600 mb-6">Let’s Get Started!</p>

        {/* Email section */}
        <InputField
          label="Email section"
          icon="✿"
          value={email}
          type="text"
          placeholder="Email Address"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password section */}
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center mb-6">
          <CheckboxWithLabel label="Remember Me" />
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Login and Signup button */}
        <div className="flex space-x-4 mb-6">
          <Button
            className={formStyles.buttonPrimary}
            value="Login"
            onClick={handleSubmit}
          />
          <Button
            className={formStyles.buttonSecondary}
            value="Sign Up"
            onClick={() => navigate("/signup")}
          />
        </div>
      </div>

      {/* Right Section : Cycle Image*/}
      <RightSection
        className={formStyles.rightSection}
        src={cycleImg}
        alt="CycleImg"
      />
    </div>
  );
};

export default Login;
