import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { PageURLConstants } from '@shared/models';

export const AuthGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService) as AuthService;
  return authService.isAuthenticated() ? true : inject(Router).createUrlTree([PageURLConstants.LOGIN], { queryParams: { returnUrl: route.path } });
};
