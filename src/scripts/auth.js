import axiosInstance from '../services/axiosInstance.js';
import Cookies from "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.mjs";

document.addEventListener('DOMContentLoaded', async () => {
  const token = Cookies.get('access_token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  try {
    await axiosInstance.get('/verify-token');
  } catch (error) {
    console.error('Token inválido ou expirado:', error);
    window.location.href = '../pages/login.html';
  }
});