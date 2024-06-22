import axios from 'axios';
import { logout } from './auth';
import { getTizaraUserToken } from '../hooks/getTokenFromstorage';

export type IGenericErrorResponse = {
  statusCode?: number;
  message?: string;
  success?: string;
  errorMessages?: IGenericErrorMessage[];
};
export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

const axiosInstance = axios.create({
  baseURL: 'https://tizara-backend.vercel.app/api/v1',
  timeout: 30000,
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
    // console.log(error, 'eeee');

    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.status || 500,
      message: error?.response?.data?.message || 'Something went wrong',
      errorMessages: error?.response?.data?.errorMessages,
      success: error?.response?.data?.success,
    };
    // return responseObject;
    return Promise.reject(responseObject);
  },
);

export default axiosInstance;
