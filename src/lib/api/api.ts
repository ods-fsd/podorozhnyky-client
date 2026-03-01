import axios from "axios";

const isServer = typeof window === "undefined";
const backendUrl = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api").replace(/\/$/, '');

export const nextServer = axios.create({
  baseURL: isServer ? backendUrl : "/app/api",
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
