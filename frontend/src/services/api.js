import axios from "axios";
import { store } from "../redux/store";
import { refreshToken } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token de acesso nas requisições
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;



    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
     console.log("error", error)
    if (error.response && (error.response.status === 401 || error.response.status === 403 ) && !originalRequest._retry) {
      originalRequest._retry = true; 
      const newAccessToken = await refreshToken();
     

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
