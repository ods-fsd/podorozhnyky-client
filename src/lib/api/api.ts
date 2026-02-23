import axios from 'axios';

export const nextServer = axios.create({
  baseURL: 'https://podorozhnyky-server.onrender.com/api',
  withCredentials: true,
});

export const api = nextServer;


