import axiosInstance from "./axiosInstance.js";
import { routes } from "./routes.js";
import { setLocalStorageData } from "../utils/utils.js";

export async function handleLogin(setIsAuthenticated) {
    let email = "ram@gmail.com";
    let password = "Abc@123"

    console.log("routes.login", routes.login);
    try {
        const { data } = await axiosInstance.post(routes.login, { email, password });
        console.log("response: ", data);
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
        const response = await axiosInstance.post(routes.checkToken);
        console.log("response: ",response);
        return response.success;
    } catch (error) {
        console.error("Error checking authentication:", error);
    }
}