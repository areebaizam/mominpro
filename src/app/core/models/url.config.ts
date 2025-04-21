import { environment } from '@env';

export class ApiURL {

    private static get baseApiUrl(): string {
        return environment.baseUrl;
    }

    public static get getAuthLoginiUrl(): string {
        const loginUrl = `${this.baseApiUrl}/login`
        return environment.useCookies? `${loginUrl}?useCookies=true` : loginUrl;
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
    public static get getAuthProfileUrl(): string {
        return `${this.baseApiUrl}/profile`;
    }

    //Organisation
    public static get getOrganisationUrl(): string {
        return `${this.baseApiUrl}/org`;
    }
}