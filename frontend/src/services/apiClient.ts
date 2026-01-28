import axios, { type AxiosError, type AxiosResponse } from "axios";
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
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    // unwrap the payload so consumers receive the response data directly
    const payload = response.data?.data as unknown;
    return { ...response, data: payload } as AxiosResponse<unknown>;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    const fallbackMessage = "An error occurred";
    const message =
      (typeof error.response?.data?.message === "string"
        ? error.response.data.message
        : undefined) || error.message || fallbackMessage;
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
