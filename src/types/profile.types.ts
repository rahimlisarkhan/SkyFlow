export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface IProfile {
  id: number;
  name: string;
  surname: string;
  email: string;
  created_at: string;
}
