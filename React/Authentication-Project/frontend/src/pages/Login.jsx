import { useEffect } from "react";
import cycleImg from "../assets/cycleImage.png";
import formStyles from "../styles/formStyles";
import Button from "../components/Button";
import InputField from "../components/InputField";
import CheckboxWithLabel from "../components/CheckboxWithLabel";
import RightSection from "../components/RightSection";
import { useNavigate } from "react-router-dom";
import { login } from "../api/apiHandlers.js";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import { validateLoginForm } from "../utils/formValidation.js";

const Login = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    setIsAuthenticated,
    email,
    setEmail,
    password,
    setPassword,
    setCurrentUserId,
  } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/userlist");
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    const errors = validateLoginForm(email,password);

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((msg) => toast.error(msg));
      return;
    }

    const { success, message, loggedUser } = await login(
      email.toLowerCase(),
      password
    );
    toast[success ? "success" : "error"](message);
    if (success) {
      setCurrentUserId(loggedUser);
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 3200);
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
            onClick={handleLogin}
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
