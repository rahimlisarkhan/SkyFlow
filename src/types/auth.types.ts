import { IResponse } from "./api.types";

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse extends IResponse<{ otp: string } | null> {}
