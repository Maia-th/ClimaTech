import axiosInstance from "./axiosInstance.js";
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.mjs';

const ACCESS_TOKEN_KEY = "access_token";

export const userService = {
  login: async (email, password) => {
    const response = await axiosInstance.post('/login', {
      email,
      password,
    });
    return response.data;
  },
  logout: async () => {
    Cookies.set(ACCESS_TOKEN_KEY, "");
  },
};
