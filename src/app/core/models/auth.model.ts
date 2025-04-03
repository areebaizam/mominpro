export interface AuthStatusModel {
    isAuthenticated: boolean;
    username: string;
    claims: ClaimsModel[];
}

export interface ClaimsModel {
    type: string;
    value: string;
}