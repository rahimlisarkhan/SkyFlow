import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { DEV_LOGGER } from './dev';
import { LoggerKeys } from '@/types/dev.types';
import { toast } from 'react-toastify';

interface INetworkError {
  message: string;
  statusCode: HttpStatusCode;
}

export enum REQUEST_METHODS {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT',
}

export const INSTANCE_METHODS = {
  GET: { method: REQUEST_METHODS.GET },
  POST: { method: REQUEST_METHODS.POST },
  DELETE: { method: REQUEST_METHODS.DELETE },
  PATCH: { method: REQUEST_METHODS.PATCH },
};

export const responseHandler = (response: AxiosResponse) => {
  DEV_LOGGER(
    (LoggerKeys.request +
      ' | ' +
      response.config.method?.toUpperCase()) as LoggerKeys.request,
    response.config.url
  );
  return response.data;
};

export const errorHandler = (e: AxiosError, returnable?: boolean) => {
  const errorResponse = e.response?.data as INetworkError;

  toast.error(errorResponse.message);
  DEV_LOGGER(LoggerKeys.networkError, {
    url: e.config?.url,
    code: e.code,
    body: e.response?.data,
  });

  if ((errorResponse.message || e.code === 'ERR_BAD_REQUEST') && !returnable) {
    const message = errorResponse?.message;
    DEV_LOGGER(message);
  }

  if (returnable) {
    return errorResponse;
  }

  return null;
};
