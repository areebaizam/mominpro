import { HttpInterceptorFn } from '@angular/common/http';

export const HeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    withCredentials: true, // Ensure cookies are sent with requests
  });
  return next(clonedRequest);
};

