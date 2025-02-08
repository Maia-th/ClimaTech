import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";

export const userService = {
  async login(email, password) {
    return axiosInstance
      .post("/login", { email, password })
      .then((response) => {
        if (response.data.token) {
          Cookies.set(ACCESS_TOKEN_KEY, response.data.token);
        }
        return response.data;
      });
  },
  logout: async () => {
    Cookies.set(ACCESS_TOKEN_KEY, "");
  },
};
