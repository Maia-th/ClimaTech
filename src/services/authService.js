import axiosInstance from './axiosInstance.js';
import Cookies from 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.mjs';

const ACCESS_TOKEN_KEY = 'access_token';

export const userService = {
  login: async (email, password) => {
    try {
      console.log('Iniciando login com:', email, password);
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });
      console.log('Resposta da API:', response.data);
      if (response.data.token) {
        Cookies.set(ACCESS_TOKEN_KEY, response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao realizar login:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Erro ao realizar login');
    }
  },
  logout: async () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
  },
};