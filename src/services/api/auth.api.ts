import { AxiosError } from 'axios';

import { EndpointResources } from '../EndpointResources.g';

import Fetcher from '@/common/helpers/instance';
import { ILogin, ILoginResponse } from '@/types/auth.types';
import {
  errorHandler,
  REQUEST_METHODS,
  responseHandler,
} from '@/common/utils/networking';

export class AuthAPI {
  public static async login(data: ILogin): Promise<ILoginResponse> {
    return await Fetcher(EndpointResources.auth.login, {
      method: REQUEST_METHODS.POST,
      data,
    })
      .then(responseHandler)
      .catch((error) => errorHandler(error as AxiosError, true));
  }
}
