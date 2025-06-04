import axios from 'axios';
import showToastMessage from '../components/showToastMessage.jsx';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000,
  withCredentials: false, // set true if you are using cookies
});

// Add interceptor to include token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log("error.response: ",error.response);
    if (error.response?.status === 401 || error.response?.status === 403) {
      showToastMessage(error.response.data?.success,error.response.data?.message);
      localStorage.clear();
      window.location.href = "http://localhost:5173";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;