import axiosInstance from "./axiosInstance.js";
import { routes } from "./routes.js";
import { sendResponseTofunction } from "../utils/utils.js";

export async function sendRequest(payload, route) {
  try {
    const { data } = await axiosInstance.post(route, payload);
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