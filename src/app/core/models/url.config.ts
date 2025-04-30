import { environment } from '@env';

export class ApiURL {

    private static get baseApiUrl(): string {
        return environment.baseUrl;
    }

    public static get getAuthLoginUrl(): string {
        return `${this.baseApiUrl}/login`;
    }
    
    public static get getAuthLogoutUrl(): string {
        return `${this.baseApiUrl}/logout`;
    }

    public static get getAuthRegisterUrl(): string {
        return `${this.baseApiUrl}/register`;
    }
    public static get getAuthStatusUrl(): string {
        return `${this.baseApiUrl}/status`;
    }
    //Organisation
    public static get getOrganisationUrl(): string {
        return `${this.baseApiUrl}/org`;
    }
}