import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStatusModel, HttpResponseModel } from '@core/models';
import { AuthService } from '@core/services/auth.service';
import { map } from 'rxjs/internal/operators/map';
//Models
// import { PagesURLConstants } from '@shared/models';

export const AuthGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService) as AuthService;
  return authService.checkAuthStatus().pipe(
    map((response: HttpResponseModel<AuthStatusModel>) => {
      let isAuthenticated: boolean = response.status.isSuccess && response.next ? response.next.isAuthenticated : false;
      let requiredRole = route.data ? route.data['role'] : 'Guest';

      if (!isAuthenticated) {
        console.log('Authentication Failed')
        // router.navigateByUrl(`${PagesURLConstants.PAGES}/${PagesURLConstants.UNAUTHORIZED}`);
        return false;
      }
      
      if (!authService.hasRole(requiredRole)) {
        console.log('Authorisation Failed')
        // router.navigateByUrl(`${PagesURLConstants.PAGES}/${PagesURLConstants.FORBIDDEN}`);
        return false;
      }
      return true;
    }));
};
