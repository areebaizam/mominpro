import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HeaderInterceptor, ErrorInterceptor } from '@core/interceptors';
import { AuthService } from '@core/services';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withComponentInputBinding()),
  provideClientHydration(),
  provideAnimationsAsync(),
  provideHttpClient(withFetch(), withInterceptors([HeaderInterceptor,ErrorInterceptor])),
  provideAppInitializer(()=>inject(AuthService).getStatus())
  ]
};