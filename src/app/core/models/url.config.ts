import { environment } from '@env';

export class ApiURL {

    private static get baseApiUrl(): string {
        return environment.baseUrl;
    }

    public static get getAuthStatusUrl(): string {
        return `${this.baseApiUrl}/status`;
    }
}