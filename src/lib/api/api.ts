import axios from 'axios';

// Це базова "заглушка" для запитів, яка дивиться на твій локальний бекенд
export const nextServer = axios.create({
  baseURL: 'http://localhost:3000', // Адреса твого бекенду (підстав свою, якщо інша)
  withCredentials: true,
});

// Експортуємо також як api, бо в деяких місцях може використовуватися ця назва
export const api = nextServer;


