import axiosInstance from "./axiosInstance.js";
import { routes } from "./routes.js";
import { setLocalStorageData } from "../utils/utils.js";

export async function login(email, password) {
  try {
    const { data } = await axiosInstance.post(routes.login, {
      email,
      password,
    });
    console.log("data: ", data);
    if (data.success) {
      setLocalStorageData("token", data.token);
    }
    return {
      success: data.success,
      message: data.message,
      loggedUser: {
        id: data.id,
        name: data.name,
        email: user.email,
        role: data.role,
      },
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}

export async function handelSignup(newUser) {
  try {
    const { data } = await axiosInstance.post(routes.signup, { newUser });
    return data;
  } catch (error) {
    console.log("Signup error: ", error);

    if (error.response) {
      return {
        success: false,
        message:
          error.response.data.message || "Something went wrong during signup",
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No response from server. Please check your connection.",
      };
    } else {
      return {
        success: false,
        message: "Unexpected error occurred.",
      };
    }
    F;
  }
}

export async function getUsersData() {
  try {
    const response = await axiosInstance.get(routes.getData);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return { success: false, userData: [] };
  }
}
