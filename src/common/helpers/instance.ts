import axios, {
  AxiosError,
  AxiosHeaderValue,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';

import { EndpointResources as API } from '@/services/EndpointResources.g';
import { DEV_LOGGER } from '../utils/dev';
import { LoggerKeys } from '@/types/dev.types';
import { ITokenResponse } from '@/types/profile.types';
import { IResponse } from '@/types/api.types';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class ApiService {
  private static instance: ApiService;
  private fetcher: AxiosInstance;

  private maxRetries = 3;
  private retryCount = 0;

  private constructor() {
    this.fetcher = axios.create({
      baseURL: 'https://api-dev.rezneed.com/api', //import.meta.env.VITE_BASE_URL_FETCH + "/api",
      timeout: 10000,
      headers: this.getHeaders(),
    });
    this.setupInterceptors();
    this.initialize();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private getHeaders(): RawAxiosRequestHeaders {
    const language = localStorage.getItem('lang') || 'en';
    const token = localStorage.getItem('access_token');

    const header = {
      'Accept-Language': language,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    return header;
  }

  private setupInterceptors(): void {
    this.fetcher.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  public updateHeaders(headers: Partial<RawAxiosRequestHeaders> = {}): void {
    const newHeaders = {
      ...this.getHeaders(),
      ...headers,
    };

    Object.entries(newHeaders).forEach(([key, value]) => {
      DEV_LOGGER(LoggerKeys.header, `KEY:${key} - VALUE:${value}`);
      this.fetcher.defaults.headers.common[key] = value as AxiosHeaderValue;
    });
  }

  private handleResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  private handleError = async (error: AxiosError): Promise<AxiosResponse> => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes('/auth/login')) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      !originalRequest._retry &&
      this.retryCount < this.maxRetries
    ) {
      this.retryCount++;

      originalRequest._retry = true;

      try {
        const newToken = await this.refreshToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return this.fetcher(originalRequest);
        } else {
          this.clearSession();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        this.clearSession();
        return Promise.reject(refreshError);
      }
    } else if (this.retryCount >= this.maxRetries) {
      this.clearSession();
      return Promise.reject(new Error('Max retry limit reached'));
    }

    return Promise.reject(error);
  };

  private async refreshToken(): Promise<string | null> {
    const token = localStorage.getItem('refresh_token');

    if (!token) {
      DEV_LOGGER(
        LoggerKeys.token,
        'Refresh token not found, session clearing...'
      );
      this.clearSession();
      return null;
    }

    try {
      delete this.fetcher.defaults.headers.common.Authorization;
      const { data: response }: { data: IResponse<ITokenResponse> } =
        await this.fetcher.post(API.auth.refresh, {
          refresh_token: token,
        });

      if (response.result) {
        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;
        localStorage.setItem('access_token', newAccessToken);
        localStorage.setItem('refresh_token', newRefreshToken);
        this.fetcher.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        DEV_LOGGER(LoggerKeys.token, 'Token refreshed successfully');
        return newAccessToken;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      DEV_LOGGER(LoggerKeys.token, 'Token refresh failed, session clearing...');
      this.clearSession();
      return null;
    }
  }

  public clearSession = (): void => {
    DEV_LOGGER(LoggerKeys.token, 'Session cleared');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete this.fetcher.defaults.headers.common.Authorization;
    window.location.href = '/auth/login';
  };

  public clearLogout = (): void => {
    this.fetcher({ url: API.auth.logout, method: 'POST' })
      .then((res) => {
        if (res.data.result) {
          this.clearSession();
        } else {
          alert('Session clear failed');
        }
      })
      .catch(() => {
        DEV_LOGGER(LoggerKeys.token, 'Session clear request failed');
      });
  };

  private initialize(): void {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.fetcher.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
  }

  public getFetcher(): AxiosInstance {
    return this.fetcher;
  }
}

const ApiServiceInstance = ApiService.getInstance();
const Fetcher = ApiServiceInstance.getFetcher();

export const updateApiHeaders = (
  headers: Partial<RawAxiosRequestHeaders> = {}
) => ApiServiceInstance.updateHeaders(headers);

export const logout = () => ApiServiceInstance.clearLogout();
export default Fetcher;
