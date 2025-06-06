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

export async function editUser(payload) {
  try {
    const { data } = await axiosInstance.post(routes.edit, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export async function uploadFiles(filesData) {
  try {
    const { data } = await axiosInstance.post(routes.uploadImages,filesData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {     //error occurs when server is not reachable(due to network connection,wrong port etc)
      return sendResponseTofunction(false, "No response from server. Please check your connection");
    } else {
      return sendResponseTofunction(false, "Unexpected error occurred")
    }
  }
}