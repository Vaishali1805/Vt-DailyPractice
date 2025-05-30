import cycleImg from "../assets/cycleImage.png";
import formStyles from "../styles/formStyles";
import Button from "../components/Button";
import InputField from "../components/InputField";
import CheckboxWithLabel from "../components/CheckboxWithLabel";
import RightSection from "../components/RightSection";
import { useNavigate } from 'react-router-dom';
import { handleLogin } from "../api/apiHandlers.js";
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useAuth();
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
        <InputField label="Email section" icon="✿" type="text" placeholder="Email Address" id="email" />

        {/* Password section */}
        <InputField type="password" placeholder="Password"/>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center mb-6">
          <CheckboxWithLabel label="Remember Me" />
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Login and Signup button */}
        <div className="flex space-x-4 mb-6">
          <Button className={formStyles.buttonPrimary} value="Login" onClick={() => handleLogin(setIsAuthenticated)} />
          <Button className={formStyles.buttonSecondary} value="Sign Up" onClick={() => navigate('/signup')} />
        </div>
      </div>

      {/* Right Section : Cycle Image*/}
      <RightSection className={formStyles.rightSection} src={cycleImg} alt="CycleImg" />
    </div>
  );
};

export default Login;
