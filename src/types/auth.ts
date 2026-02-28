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
    token?: string;
    user: IUser;
  };
  message?: string;
  status?: number;
}

export interface AuthResponseRegister {
  data: {
    accessToken?: string;
    token?: string;
    user: IUser;
  };
  message?: string;
  status?: number;
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
