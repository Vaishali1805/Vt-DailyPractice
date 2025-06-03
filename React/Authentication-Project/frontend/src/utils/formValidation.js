export const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{6,}$/;    //move in constant.js

export function validateSignupForm({ name, email, password, confirmPassword, role }) {
  const errors = {};

  errors.name = !name
    ? "*Name is required"
    : name.length < 2 || name.length > 30
      ? "*Name must be between 2 and 30 characters"
      : "";

  errors.email = !email
    ? "*Email is required"
    : !EmailRegex.test(email)
      ? "*Invalid email address"
      : "";

  errors.password = password.length < 6
    ? "*Password must be at least 6 characters"
    : !PasswordRegex.test(password)
      ? "*Password must include uppercase, lowercase, number, special char"
      : "";

  errors.confirmPassword =
    confirmPassword !== password ? "*Confirm password must match" : "";

  errors.role = !role ? "*Role is required" : "";

  return errors;
}

export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateProfileForm = (email, name) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EmailRegex.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
};