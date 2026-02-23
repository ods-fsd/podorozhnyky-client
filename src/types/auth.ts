import { IUser } from "./user";

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password?: string;
}

export interface SendResetEmailCredentials {
  email: string;
}

export interface AuthResetPwdCredentials {
  password?: string;
  token?: string;
}

export interface AuthResponseLogin {
  data: {
    accessToken?: string;
    user: IUser;
    [key: string]: unknown;
  };
  message?: string;
  status?: number;
  [key: string]: unknown;
}

export interface AuthResponseRegister {
  data: {
    user: IUser;
    [key: string]: unknown;
  };
  message?: string;
  status?: number;
  [key: string]: unknown;
}

export interface AuthResponseLogout {
  message?: string;
  status?: number;
  [key: string]: unknown;
}

export interface AuthResponseRefresh {
  success: boolean;
  data?: unknown;
  [key: string]: unknown;
}
