import type { Nullable } from '~/types/utils';

export interface AuthUser {
  name: string;
  email: string;
  avatar: string;
}

export interface AuthSession {
  user: Nullable<AuthUser>;
  accessToken: Nullable<string>;
  refreshToken: Nullable<string>;
}
