import axios from "axios";
import { ApiResponse } from "@/types/api";

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) || "/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - unwrap the data property
apiClient.interceptors.response.use(
  (response) => {
    // The response.data is the ApiResponse<T>, but we unwrap it
    // So the caller gets T directly
    return (response.data as ApiResponse<any>).data;
  },
  (error: any) => {
    const message = error.response?.data?.message || error.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
