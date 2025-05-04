import { HttpErrorResponse, HttpInterceptorFn, HttpResponse, } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponseModel } from '@core/models';
import { PageURLConstants } from '@shared/models';
import { catchError, of, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            //TODO LOG ERROR
            console.log(" ErrorInterceptor next", error)
            let statusCode = error.status;
            switch (statusCode) {
                //TODO SET ENUMS
                case 401:
                    router.navigateByUrl(`${PageURLConstants.LOGIN}`);
                    break;
                case 403:
                    router.navigateByUrl(`${PageURLConstants.FORBIDDEN}`);
                    break;
                // case 500:
                //     router.navigateByUrl(`${PageURLConstants.ERROR}`);
                //     break;
                // default:
                //     //TODO make it generic for all other errors
                //     return of(
                //         new HttpResponse<HttpResponseModel>({
                //             body: { errors: null, next: null, status: error.error.status ?? { isSuccess: false, message: error.error.message, statusCode: error.status, timeStamp: new Date().toISOString() } },
                //             status: statusCode
                //         })
                //     );
            }
            //TODO Check what to do here
            return throwError(() => error);
        })
    )
};