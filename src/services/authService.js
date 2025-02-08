import axiosInstance from './axiosInstance.js';
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.mjs';

const ACCESS_TOKEN_KEY = 'access_token';

export const userService = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });
      if (response.data.token) {
        Cookies.set(ACCESS_TOKEN_KEY, response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao realizar login');
    }
  },
  logout: async () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
  },
};