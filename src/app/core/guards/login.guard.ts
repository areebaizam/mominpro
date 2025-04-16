import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { FeatureURLConstants} from '@shared/models';

export const LoginGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService) as AuthService;
  return !authService.isAuthenticated() ? true : inject(Router).createUrlTree([FeatureURLConstants.HOME]);
};
