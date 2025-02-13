export enum ROLE {
  FREE = 'FREE',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface IProfile {
  tokens: ITokenResponse;
  profile: {
    id: number;
    name: string;
    surname: string;
    email: string;
    created_at: string;
    license: ROLE;
  };
}
