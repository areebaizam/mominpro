import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStatusModel, HttpResponseModel } from '@core/models';
import { AuthService } from '@core/services/auth.service';
import { map } from 'rxjs/internal/operators/map';
//Models
import { PagesURLConstants } from '@shared/models';

export const AuthGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService) as AuthService;
  const router = inject(Router);
  return authService.checkAuthStatus().pipe(
    map((response: HttpResponseModel<AuthStatusModel>) => {
      let isSuccess:boolean = response && response.status && response.status.isSuccess;
      if(!isSuccess){
        let statusCode = response && response.status && response.status.statusCode;
        switch(statusCode){
          //TODO SET ENUMS
          case 401:
            router.navigateByUrl(`${PagesURLConstants.LOGIN}`);
            break;
          case 403:
            router.navigateByUrl(`${PagesURLConstants.FORBIDDEN}`);
            break;
        }
      }
      return isSuccess;
    }));
};
