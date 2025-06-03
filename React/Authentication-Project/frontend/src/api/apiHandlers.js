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
      setLocalStorageData("currentUser",data.userData);
    }
    return {
      success: data.success,
      message: data.message,
      loggedUser: data.userData,
    };
  } catch (error) {
    console.log("login error: ", error);
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
    // console.log("Signup error: ", error);

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
    return { error: error, success: false, userData: [] };
  }
}

export async function deleteUser(userIds) {
  try {
    const response = await axiosInstance.post(routes.delete,{ userIds });
    return response.data;
  } catch (error) {
    return { error: error, success: false}
  }
}

export async function editUser(formData,id) {
  try {
    const response = await axiosInstance.post(routes.edit, { id,name: formData.name, email: formData.email, role: formData.role });
    return response.data;
  } catch (error) {
    return { error: error, success: false}
  }
}