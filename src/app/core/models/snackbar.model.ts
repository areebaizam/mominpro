export type SnackBarType = 'success' | 'error' | 'warning';
export interface SnackbarData {
    message: string;
    type: SnackBarType;
    msDuration: number;
    msDelay: number;
}