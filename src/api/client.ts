import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { store } from "../store/store";
import { logoutUser } from "../store/userSlice";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState()?.scheditixUser?.userToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error: AxiosError) => {
    console.log(error?.response);
    if (error.response?.status === 401) {
      store?.dispatch(logoutUser());
      window.location.href = "/login";
    }

    if (error.response?.status === 403) {
      console.error("Forbidden access");
    }

    return Promise.reject(error);
  }
);
