import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { PageURLConstants } from '@shared/models';

export const AdminGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService) as AuthService;
  return authService.getUserProfile()?.role == "Admin" ? true : inject(Router).createUrlTree([PageURLConstants.FORBIDDEN]);
};
