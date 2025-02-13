import { HttpStatusCode } from 'axios';

export type TPaginationState = {
  prev: null | number;
  next: null | number;
  current: number;
  total: number;
  totalPages: number;
};

export interface IResponse<T> {
  data: T;
  result?: boolean;
  message: string;
  pagination?: TPaginationState;
  statusCode?: HttpStatusCode;
}

export interface IParams {
  page?: string | number;
  limit?: string | number;
}
