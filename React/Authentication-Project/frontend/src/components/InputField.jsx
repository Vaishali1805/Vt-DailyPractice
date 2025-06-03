import { useState } from "react";
import formStyles from "../styles/formStyles";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  label,
  type,
  placeholder,
  icon,
  id,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;
  return (
    <div className="mb-4">
    {label && (
      <label className={formStyles.label}>
        {icon && <span className="mr-2">{icon}</span>} {label}
      </label>
    )}
    <div className="relative">
      <input
      type={inputType}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${formStyles.input} ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
     {isPasswordType && (
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
    
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
  )
}

export default InputField;
