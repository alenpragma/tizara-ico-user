import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getTizaraUserToken, setTizaraUserToken } from "../hooks/getTokenFromstorage";
import { baseUrl } from "./api";
import { logout } from "./auth";

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
  baseURL: `${baseUrl}`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getTizaraUserToken();

  if (token) {
    config.headers.Authorization = `${token}`; // Bearer prefix দিন
  }

  return config;
});

// ================= Response Interceptor =================
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        // wait until refresh finishes
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = token;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${baseUrl}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const newAccessToken = res.data?.data?.accessToken;
        setTizaraUserToken(newAccessToken);
        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = newAccessToken;
        }

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    if (error.response?.status === 401) {
      logout();
    }

    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.status || 500,
      message: (error?.response?.data as any)?.message || "Something went wrong",
      errorMessages: (error?.response?.data as any)?.errorMessages,
      success: (error?.response?.data as any)?.success,
    };
    return Promise.reject(responseObject);
  }
);

export default axiosInstance;
