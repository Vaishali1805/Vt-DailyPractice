// React hook for side effects
import { useEffect, useState } from "react";

//components
import RightSection from "../components/RightSection";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ShowToastMessage from "../components/showToastMessage.jsx";

//assets and styles
import cycleImg from "../assets/cycleImage.png";
import formStyles from "../styles/formStyles";

// Import navigation, API call, authentication context, and form validation utility
import { useNavigate } from "react-router-dom";
import { handelSignup, sendRequest } from "../api/apiHandlers.js";
import { useAuth } from "../context/AuthContext.jsx";
import { validateSignupForm } from "../utils/validation.js";
import { routes } from "../api/routes.js";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });
  const [errors, setErrors] = useState({});

  // Redirect to user list page if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/userlist");
    }
  }, [isAuthenticated]);

  // Handle input change for all fields except radio buttons
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // Handle change specifically for radio button (role selection)
  const handleRoleChange = (e) => {
    setForm((prev) => ({ ...prev, role: e.target.value }));
  };

  // Submit handler for signup
  const handleSubmit = async () => {
    const validationErrors = validateSignupForm(form);
    setErrors(validationErrors);

    const isValid = Object.values(validationErrors).every((msg) => msg === "");
    if (!isValid) return;

    const { name, email, password, role } = form;
    const signupData = { name, email: email.toLowerCase(), password, role };

    // send data to backend
    const res = await handelSignup(signupData);
    // const res = await sendRequest(signupData,routes.signup);
    ShowToastMessage(res?.success, res?.message);
    if (res?.success) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section: SignUp Form */}
      <div className="w-1/2 flex flex-col justify-center p-10 bg-white h-screen overflow-hidden">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Join Us</h1>
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">
          Sign up to create your account and manage users
        </h2>
        <p className="text-gray-600 mb-6">Sign up in a few easy steps</p>

        {/* Name */}
        <InputField
          label="Name"
          icon="✿"
          type="text"
          placeholder="Enter your name here"
          id="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Email section */}
        <InputField
          type="text"
          placeholder="Email Address"
          id="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* Password section */}
        <InputField
          type="password"
          placeholder="Password"
          id="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        {/* Confirm Password section */}
        <InputField
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        {/* Role - User/Admin */}
        <div className="flex items-center gap-6 mb-6">
          <label className="text-lg font-semibold text-blue-800">
            <span className="mr-2"></span> Role:
          </label>
          <div className="flex items-center gap-4">
            {["Admin", "User"].map((role) => (
              <div
                key={role}
                className="flex items-center text-base text-gray-700">
                <input
                  type="radio"
                  id={role}
                  name="role"
                  value={role}
                  checked={form.role === role}
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                <label htmlFor={role}>{role}</label>
              </div>
            ))}
          </div>
        </div>
        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

        {/* Login and Signup button */}
        <div className="flex space-x-4 mb-6">
          <Button
            className={formStyles.buttonPrimary}
            value="Sign Up"
            onClick={handleSubmit}
          />
          <Button
            className={formStyles.buttonSecondary}
            value="Login"
            onClick={() => navigate("/login")}
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

export default Signup;
