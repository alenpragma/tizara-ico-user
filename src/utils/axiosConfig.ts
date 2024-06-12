// src/utils/axiosConfig.js
import axios from 'axios';
import { logout } from './auth';
import { getTizaraUserToken } from '../hooks/getTokenFromstorage';

const axiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = getTizaraUserToken();

  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      logout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
