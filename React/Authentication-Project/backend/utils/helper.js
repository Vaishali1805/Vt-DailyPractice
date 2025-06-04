import jwt from 'jsonwebtoken';
import { EmailRegex, PasswordRegex } from './constant.js';

export const createToken = async (payload) => {
    const token = jwt.sign(payload,process.env.TOKEN_SECRET,{ expiresIn: '1h' });
    return token;
}

export const tokenVerify = async (token) => {
    const result = jwt.verify(token,process.env.TOKEN_SECRET);
    return result;
}

export const sendResponse = (res,message,success,status,userData = null,token = null) => {
    return res.status(status).json({ message, success, userData,token });
}

export const validateData = (data) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    role
  } = data;

  // If 'name' is present, validate it
  if ('name' in data && !name?.trim()) return false;

  // If 'email' is present, validate it
  if ('email' in data && (!email?.trim() || !EmailRegex.test(email))) return false;

  // If 'password' is present, validate it
  if ('password' in data && (!password?.trim() || !PasswordRegex.test(password))) return false;

  // If 'confirmPassword' is present, validate match with password
  if ('confirmPassword' in data && password !== confirmPassword) return false;

  // If 'role' is present, validate it
  if ('role' in data && !["Admin", "User"].includes(role)) return false;

  return true;
};