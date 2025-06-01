import axiosInstance from "./axiosInstance.js";
import { routes } from "./routes.js";
import { setLocalStorageData } from "../utils/utils.js";

export async function handleLogin(email,password,setIsAuthenticated) {
    try {
        console.log("email:",email,"password:",password);
        const { data } = await axiosInstance.post(routes.login, { email, password });
        console.log("data: ", data);
        setLocalStorageData("token", data.token);
        setIsAuthenticated(true);
    } catch (error) {
        console.log("error: ", error)
    }
}

export function handelSignup() {
    //validate all the fields here then send the request to backend to register the user
    console.log("am in handle signup");
}

export async function verifyAuth() {
    try {
        console.log("in verifyAuth");
        const response = await axiosInstance.post(routes.checkToken);
        console.log("response: ",response);
        return response.data.success;
    } catch (error) {
        console.error("Error checking authentication:", error);
        return false;
    }
}