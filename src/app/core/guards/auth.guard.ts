import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStatusModel, HttpResponseModel } from '@core/models';
import { map } from 'rxjs/internal/operators/map';
//Models
// import { PagesURLConstants } from '@shared/models';

export const AuthGuard: CanMatchFn = (route, segments) => {
  return true;
};
