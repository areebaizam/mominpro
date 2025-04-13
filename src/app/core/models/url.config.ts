import { environment } from '@env';

export class ApiURL {

    private static get baseApiUrl(): string {
        return environment.baseUrl;
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