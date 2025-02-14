import { ROLE } from '@/common/constants/role';

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface IProfile {
  tokens: ITokenResponse;
  profile: {
    id: number;
    full_name: string;
    email: string;
    created_at: string;
    license: ROLE;
  };
}
