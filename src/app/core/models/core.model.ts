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

export interface HttpResponseModel<T = unknown> {
    next: T;
    status: HttpResponseStatus;
    errors: HttpResponseError[] | null;
}