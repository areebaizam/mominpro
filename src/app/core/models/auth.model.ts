import { ClaimType,Role } from "./core.constant";

export interface ClaimModel {
  type: ClaimType;
  value: string;
}
export interface AuthStatusModel {
  isAuthenticated: boolean;
  claims: ClaimModel[];
}

export interface UserProfile {
  role: Role | null;
  displayName: string;
  email: string | null;
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
