import { EmailRegex } from "./constant";
import { PasswordRegex } from "./constant";

//function to validate the signup form
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
      ? "*Password must include uppercase, lowercase, number, special char and maximum length is 15"
      : "";

  errors.confirmPassword =
    confirmPassword !== password ? "*Confirm password must match" : "";

  errors.role = !role ? "*Role is required" : "";

  return errors;
}

//function to validate the login form
export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  }
  // else if (!/\S+@\S+\.\S+/.test(email)) {
  //   errors.email = "Invalid email format";
  // }

  if (!password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

// function to validate the Profile form
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

export const validateFile = (file) => {
  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    // "application/pdf",
  ];
  const maxSize = 5 * 1024 * 1024; //5MB
  if (!validTypes.includes(file.type)) {
    return {message: "Invalid file type. Please select an image (JPG, JPEG, PNG )",result: false};
  }

  if (file.size > maxSize) {
    return {message: "File size exceeds 5MB. Please select a smaller image.",result: false};
  }

  return {message: "Validation successfull",result: true};
}