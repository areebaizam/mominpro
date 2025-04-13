import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { PageURLConstants } from '@shared/models';

export const AuthGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService) as AuthService;
  //TODO Add return Path
  return authService.isAuthenticated() ? true : inject(Router).createUrlTree([PageURLConstants.LOGIN]);
};
