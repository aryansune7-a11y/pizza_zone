import axios from 'axios';

const adminApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor attaching Admin JWT Session Token & TOTP 2FA headers
adminApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('pizza_zone_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

adminApiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('pizza_zone_admin_token');
    }
    return Promise.reject(error);
  }
);

export default adminApiClient;
