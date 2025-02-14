import Fetcher from "@/common/helpers/instance";
import {
  errorHandler,
  INSTANCE_METHODS,
  responseHandler,
} from "@/common/utils/networking";
import { EndpointResources } from "@/services/EndpointResources.g";
import { IResponse } from "@/types/api.types";
import { IProfile } from "@/types/profile.types";

export class ProfileAPI {
  public static async profile(): Promise<IResponse<IProfile["profile"]>> {
    return await Fetcher(EndpointResources.profile.index, INSTANCE_METHODS.GET)
      .then(responseHandler)
      .catch((error) => {
        errorHandler(error, true);
      });
  }
}
