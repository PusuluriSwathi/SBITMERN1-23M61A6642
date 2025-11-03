import axios from 'axios';

const base = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: base,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API error', err.response?.status, err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export default api;