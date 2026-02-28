import axios from "axios";

export const nextServer = axios.create({
  baseURL: "/app/api",
  withCredentials: true,
});

nextServer.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = nextServer;
