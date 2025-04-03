interface HttpResponseStatus {
    isSuccess: boolean;
    message: string;
    statusCode: number;
    timeStamp: string;
}

interface HttpResponseError {
    code: string;//TODO Check this 
    message: string;
}

export interface HttpResponseModel<T> {
    next: T | null;
    status: HttpResponseStatus;
    errors: HttpResponseError[] | null;
}