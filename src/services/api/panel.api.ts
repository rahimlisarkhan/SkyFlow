import Fetcher from "@/common/helpers/instance";
import {
  errorHandler,
  INSTANCE_METHODS,
  responseHandler,
} from "@/common/utils/networking";
import { EndpointResources } from "@/services/EndpointResources.g";
import { IResponse } from "@/types/api.types";
import { IDashboard, IProject, IReport } from "@/types/panel.types";

export class PanelAPI {
  public static async dashboard(): Promise<IResponse<IDashboard[]>> {
    return await Fetcher(
      EndpointResources.panel.dashboard,
      INSTANCE_METHODS.GET,
    )
      .then(responseHandler)
      .catch((error) => {
        errorHandler(error, true);
      });
  }

  public static async projects(): Promise<IResponse<IProject[]>> {
    return await Fetcher(EndpointResources.panel.projects, INSTANCE_METHODS.GET)
      .then(responseHandler)
      .catch((error) => {
        errorHandler(error, true);
      });
  }

  public static async reports(): Promise<IResponse<IReport>> {
    return await Fetcher(EndpointResources.panel.charts, INSTANCE_METHODS.GET)
      .then(responseHandler)
      .catch((error) => {
        errorHandler(error, true);
      });
  }

  public static async infos(): Promise<IResponse<IReport>> {
    return await Fetcher(
      EndpointResources.panel.information,
      INSTANCE_METHODS.GET,
    )
      .then(responseHandler)
      .catch((error) => {
        errorHandler(error, true);
      });
  }
}
