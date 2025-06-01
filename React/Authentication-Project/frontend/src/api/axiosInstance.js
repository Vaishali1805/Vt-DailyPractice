import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
  withCredentials: false, // set true if you are using cookies
});

// Add interceptor to include token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("token: ",token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;