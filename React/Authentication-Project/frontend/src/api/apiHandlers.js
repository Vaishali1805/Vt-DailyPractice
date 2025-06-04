import axiosInstance from "./axiosInstance.js";
import { routes } from "./routes.js";
import { sendResponseTofunction } from "../utils/utils.js";

export async function handleLogin(email, password) {
  try {
    const { data } = await axiosInstance.post(routes.login, {
      email,
      password,
    });
    return data;
  } catch (error) {
    // console.log("login error: ", error);
    if (error.response) {
      return error.response.data;
    } else if (error.request) {     //error occurs when server is not reachable(due to network connection,wrong port etc)
      return sendResponseTofunction(false, "No response from server. Please check your connection");
    } else {
      return sendResponseTofunction(false, "Unexpected error occurred")
    }
  }
}

export async function handelSignup(newUser) {
  try {
    const { data } = await axiosInstance.post(routes.signup, { newUser });
    return data;
  } catch (error) {
    // console.log("signup error: ", error);
    if (error.response) {
      return error.response.data;
    } else if (error.request) {     //error occurs when server is not reachable(due to network connection,wrong port etc)
      return sendResponseTofunction(false, "No response from server. Please check your connection");
    } else {
      return sendResponseTofunction(false, "Unexpected error occurred")
    }
  }
}

export async function getUsersData() {
  try {
    const { data } = await axiosInstance.get(routes.getData);
    return data;
  } catch (error) {
    // console.log("Data fetch error: ", error);
    if (error.response) {
      return error.response.data;
    } else if (error.request) {     //error occurs when server is not reachable(due to network connection,wrong port etc)
      return sendResponseTofunction(false, "No response from server. Please check your connection");
    } else {
      return sendResponseTofunction(false, "Unexpected error occurred")
    }
  }
}

export async function deleteUser(userIds) {
  try {
    const { data } = await axiosInstance.post(routes.delete, { userIds });
    return data;
  } catch (error) {
    // console.log("Delete user error: ", error);
    if (error.response) {
      return error.response.data;
    } else if (error.request) {     //error occurs when server is not reachable(due to network connection,wrong port etc)
      return sendResponseTofunction(false, "No response from server. Please check your connection");
    } else {
      return sendResponseTofunction(false, "Unexpected error occurred")
    }
  }
}

export async function editUser(formData) {
  try {
    const { data } = await axiosInstance.post(routes.edit, {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      role: formData.role
    });
    return data;
  } catch (error) {
    // console.log("Edit user error: ", error);
    if (error.response) {
      return error.response.data;
    } else if (error.request) {     //error occurs when server is not reachable(due to network connection,wrong port etc)
      return sendResponseTofunction(false, "No response from server. Please check your connection");
    } else {
      return sendResponseTofunction(false, "Unexpected error occurred")
    }
  }
}
