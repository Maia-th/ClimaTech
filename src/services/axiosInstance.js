import axios from "https://cdn.skypack.dev/axios";
import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.mjs";

const baseURL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

const ACCESS_TOKEN_KEY = "access_token";

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "../pages/login.html";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;