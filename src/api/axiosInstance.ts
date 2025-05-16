import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
