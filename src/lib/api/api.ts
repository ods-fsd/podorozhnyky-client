import axios from "axios";

export const nextServer = axios.create({

  baseURL: process.env.NEXT_PUBLIC_API_URL || (typeof window === "undefined" ? "http://localhost:5000/api" : "/app/api"),
  withCredentials: true,
});

export const api = nextServer;
