import cycleImg from "../assets/cycleImage.png";
import formStyles from "../styles/formStyles";
import RightSection from "../components/RightSection";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';
import { handelSignup } from '../api/apiHandlers.js'

const Signup = () => {
   const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section: SignUp Form */}
      <div className="w-1/2 flex flex-col justify-center p-10 bg-white">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Join Us</h1>
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">
          Sign up to create your account and manage users
        </h2>
        <p className="text-gray-600 mb-6">Sign up in a few easy steps</p>

        {/* Name */}
        <InputField
          label="Let’s get to know you"
          icon="✿"
          type="text"
          placeholder="Enter your name here"
          id="name"
        />

        {/* Email section */}
        <InputField type="text" placeholder="Email Address" id="email" />

        {/* Password section */}
        <InputField type="password" placeholder="Password" />

        {/* Role - User/Admin */}
        <div className="flex items-center gap-6 mb-6">
          <label className="text-lg font-semibold text-blue-800">
            <span className="mr-2"></span> Role:
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-base text-gray-700">
              <input
                type="radio"
                id="admin"
                name="role"
                value="Admin"
                className="mr-2"
              />
              <label htmlFor="admin">Admin</label>
            </div>
            <div className="flex items-center text-base text-gray-700">
              <input
                type="radio"
                id="user"
                name="role"
                value="User"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="user">User</label>
            </div>
          </div>
        </div>

        {/* Login and Signup button */}
        <div className="flex space-x-4 mb-6">
          <Button className={formStyles.buttonPrimary} value="Sign Up" onClick={handelSignup} />
          <Button className={formStyles.buttonSecondary} value="Login" onClick={() => navigate('/login')} />
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
