import axiosInstance from "./axiosInstance.js";
import { routes } from "./routes.js";
import { setLocalStorageData } from "../utils/utils.js";

export async function login(email, password) {
    try {
        const { data } = await axiosInstance.post(routes.login, { email, password });
        if (data.success) {
            setLocalStorageData("token", data.token);
        }
        return {
            success: data.success,
            message: data.message
        };
    } catch (error) {
        console.log("error: ", error)
        return {
            success: false,
            message: error.response?.data?.message || "Something went wrong"
        };
    }
}

export function handelSignup() {
    //validate all the fields here then send the request to backend to register the user
    console.log("am in handle signup");
}

export async function getUsersData() {
    try {
        const response = await axiosInstance.get(routes.getData);
        return response.data;
    } catch (error) {
        console.log("error: ", error)
        return { success: false, userData: [] };
    }
}