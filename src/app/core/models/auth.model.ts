import { ClaimType } from "./core.constant";

export interface AuthProfileModel {
  isAuthenticated: boolean;
  userName: string;
  organisationId: string;
  claims: ClaimModel[];
}

export interface ClaimModel {
  type: ClaimType;
  value: string;
}
export interface AuthStatusModel {
  isAuthenticated: boolean;
}

export interface AuthProfile {
  isAdmin: boolean;
  userName: string;
  organisationId: string | null;
}

export interface AuthLoginRequestModel {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthRegisterRequestModel {
  email: string;
  password: string;
  name?: string;
}

export const defaultAuthProfile: AuthProfile = {
  isAdmin: false,
  userName: "Guest",
  organisationId: null,
};