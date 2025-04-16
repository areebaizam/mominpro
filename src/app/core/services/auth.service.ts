import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { catchError, firstValueFrom, Observable, of, tap } from 'rxjs';
import { ApiURL, AuthProfile, AuthProfileModel, AuthStatusModel, ClaimModel, ClaimType, defaultAuthProfile, HttpResponseModel } from '@core/models';
import { getResult } from '@core/utilities';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private http = inject(HttpClient);
  private authProfile = signal<AuthProfile>(defaultAuthProfile);
  private claims: ClaimModel[] = [];
  isAuthenticated = signal<boolean>(false);

  get userName() {
    return this.authProfile().userName;
  }

  get isAdmin() {
    return this.authProfile().isAdmin;
  }

  get organisationId() {
    return this.authProfile().organisationId;
  }

  set organisationId(value:string|null) {
    this.authProfile.update(state => ({
      ...state,
      organisationId: value
    }));
  }
  constructor() {
    // 👇 effect to reset authState when isAuthenticated becomes false
    effect(() => {
      if (this.isAuthenticated())
        firstValueFrom(this.getAuthProfile());
      else this.authProfile.set(defaultAuthProfile);
    });
  }

  getAuthProfile(): Observable<HttpResponseModel<AuthProfileModel>> {
    return this.http.get<HttpResponseModel<AuthProfileModel>>(ApiURL.getAuthProfileUrl)
      .pipe(
        tap(response => {
          let next = getResult(response);
          if (next) {
            this.isAuthenticated.set(true);
            this.claims = next.claims;
            this.authProfile.update(state => ({
              ...state,
              isAdmin: this.hasClaimValue(ClaimType.ROLE, 'Admin') ? true : false,
              userName: next.userName,
              organisationId: next.organisationId
            }));
          }
        })
      );
  }

  private hasClaimValue(type: ClaimType, value: string): ClaimModel | null {
    return this.claims.find(claim => claim.type == type && value == value) ?? null;
  }

  async getStatus(): Promise<HttpResponseModel<AuthStatusModel> | void> {
    return firstValueFrom(
      this.http.get<HttpResponseModel<AuthStatusModel>>(ApiURL.getAuthStatusUrl).pipe(
        // handle any errors and still allow app to load
        //TODO LOG ERROR
        catchError((err) => {
          console.warn('Auth init error', err);
          return of(null); // fallback
        })
      )
    ).then((response) => {
      this.isAuthenticated.set(response?.next?.isAuthenticated ?? false);
    });
  }

  logout() {
    this.isAuthenticated.set(false);
  }
}
