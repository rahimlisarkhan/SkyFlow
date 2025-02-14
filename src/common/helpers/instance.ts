import axios, {
  AxiosError,
  AxiosHeaderValue,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";

import { EndpointResources as API } from "@/services/EndpointResources.g";
import { DEV_LOGGER } from "../utils/dev";
import { LoggerKeys } from "@/types/dev.types";
import { ITokenResponse } from "@/types/profile.types";
import { IResponse } from "@/types/api.types";
import { LOCAL_STORE } from "../constants/keys";
import { store } from "../store";
import { reset } from "../store/slices/authSlice";

let fetcher: AxiosInstance | null = null;
const maxRetries = 3;
let retryCount = 0;

//  Get default headers (only runs on the client)
const getHeaders = (): RawAxiosRequestHeaders => {
  if (typeof window === "undefined") return {};

  const language = localStorage.getItem("lang") || "en";
  const token = localStorage.getItem(LOCAL_STORE.ACCESS_TOKEN);

  return {
    "Accept-Language": language,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
  };
};

// Create a singleton Axios instance
const createFetcher = (): AxiosInstance => {
  if (fetcher) return fetcher;

  fetcher = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000,
  });

  setupInterceptors(fetcher);
  updateHeaders(); // Ensure headers are set

  return fetcher;
};

/**
 * Update headers dynamically (only on the client)
 */
const updateHeaders = (headers: Partial<RawAxiosRequestHeaders> = {}): void => {
  if (typeof window === "undefined" || !fetcher) return;

  const newHeaders = { ...getHeaders(), ...headers };

  Object.entries(newHeaders).forEach(([key, value]) => {
    if (value) {
      fetcher!.defaults.headers.common[key] = value as AxiosHeaderValue;
    }
  });
};

// Response interceptor to handle token refresh
const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(handleResponse, handleError);
};

//  Handle successful response
const handleResponse = (response: AxiosResponse): AxiosResponse => response;

// Handle error responses and token refresh
const handleError = async (error: AxiosError): Promise<AxiosResponse> => {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  if (!originalRequest) return Promise.reject(error);

  if (originalRequest.url?.includes("/auth/login")) {
    return Promise.reject(error);
  }

  if (
    error.response?.status === HttpStatusCode.Unauthorized &&
    !originalRequest._retry &&
    retryCount < maxRetries
  ) {
    retryCount++;

    originalRequest._retry = true;

    try {
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return fetcher!(originalRequest);
      } else {
        clearSession();
        return Promise.reject(error);
      }
    } catch (refreshError) {
      clearSession();
      return Promise.reject(refreshError);
    }
  } else if (retryCount >= maxRetries) {
    clearSession();
    return Promise.reject(new Error("Max retry limit reached"));
  }

  return Promise.reject(error);
};

// Refresh token logic
const refreshToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") return null;

  const refreshToken = localStorage.getItem(LOCAL_STORE.REFRESH_TOKEN);
  if (!refreshToken) {
    clearSession();
    return null;
  }

  try {
    delete fetcher!.defaults.headers.common.Authorization;
    const { data: response }: { data: IResponse<ITokenResponse> } =
      await fetcher!.post(API.auth.refresh, {
        refresh_token: refreshToken,
      });

    if (response.result) {
      const newAccessToken = response.data.access_token;
      const newRefreshToken = response.data.refresh_token;

      localStorage.setItem(LOCAL_STORE.ACCESS_TOKEN, newAccessToken);
      localStorage.setItem(LOCAL_STORE.REFRESH_TOKEN, newRefreshToken);

      fetcher!.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      return newAccessToken;
    } else {
      throw new Error("Token refresh failed");
    }
  } catch (error) {
    clearSession();
    return null;
  }
};

// Clear session and log out
const clearSession = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(LOCAL_STORE.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORE.REFRESH_TOKEN);
  delete fetcher!.defaults.headers.common.Authorization;
  store.dispatch(reset());
  DEV_LOGGER(LoggerKeys.token, "Session cleared");
};

// Logout function
const logout = (): void => {
  fetcher!
    .post(API.auth.logout)
    .then((res) => {
      clearSession();
    })
    .catch(() => {
      DEV_LOGGER(LoggerKeys.token, "Session clear request failed");
    });
};

// Initialize fetcher
const Fetcher = createFetcher();

export { updateHeaders, logout };

export default Fetcher;
