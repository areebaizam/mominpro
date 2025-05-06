import { HttpClient } from "@angular/common/http";
import { effect, inject, Injectable, signal } from "@angular/core";
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  ApiURL, AuthLoginRequestModel, AuthRegisterRequestModel, AuthStatusModel,
  ClaimModel, ClaimType, HttpResponseModel, Role, UserProfile
} from "@core/models";
import { getResult } from "@core/utilities";
import { environment } from '@env';
import { FeatureURLConstants } from "@shared/models";
import { catchError, firstValueFrom, Observable, of, tap } from "rxjs";
import { SnackbarService } from "./snackbar.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private snackBar = inject(SnackbarService);
  isAuthenticated = signal<boolean>(false);
  private userProfile: UserProfile | null = null;
  private claims: ClaimModel[] = [];
  private location = inject(Location);

  constructor() {
    // 👇 effect to reset authState when isAuthenticated becomes false
    effect(() => {
      if (this.isAuthenticated()) {
        let email = this.getClaimValue(ClaimType.EMAIL);
        let displayName = this.getClaimValue(ClaimType.GIVEN_NAME) ?? email ?? 'Guest';
        this.userProfile = {
          role: this.getClaimValue(ClaimType.ROLE) as Role,
          email: email,
          displayName: displayName,
        };
        this.snackBar.success("Welcome back " + displayName);
      }
      else {
        this.userProfile = null;
      }
    });
  }


  // TODO Move this to service or utility
  private hasClaimValue(type: ClaimType, value: string): ClaimModel | null {
    return (
      this.claims.find((claim) => claim.type == type && value == value) ?? null
    );
  }
  // TODO Move this to service or utility
  private getClaimValue(type: ClaimType): string | null {
    return (
      this.claims.find((claim) => claim.type == type)?.value ?? null
    );
  }

  getUserProfile() {
    return this.userProfile;
  }

  async getStatus(): Promise<HttpResponseModel<AuthStatusModel> | void> {
    return firstValueFrom(
      this.http
        .get<HttpResponseModel<AuthStatusModel>>(ApiURL.getAuthStatusUrl)
        .pipe(
          tap((response) => {
            let next = getResult(response);
            if (next?.isAuthenticated) {
              this.claims = next.claims;
            }
          }),
          catchError((error) => {
            //TODO LOG ERROR
            if (!this.location.path().startsWith('/login')) {
              this.router.navigateByUrl(FeatureURLConstants.HOME);
            }
            return of(null); // pass null to then
          })
        )
    ).then((response) => {
      this.isAuthenticated.set(response?.next?.isAuthenticated ?? false);
    });
  }

  login(req: AuthLoginRequestModel): Observable<any> {
    const params = new URLSearchParams();

    if (environment.useCookies) {
      params.set('useCookies', 'true');

      //By default cookies are persistent, set seesion cookies to true for session based authentication
      if (req.rememberMe) {
        //Set to true for session cookies, login on each browser session
        params.set('useSessionCookies', 'false');//Redundant step not required for false
      }
    }

    const url = `${ApiURL.getAuthLoginUrl}${params.toString() ? '?' + params.toString() : ''}`;
    return this.http.post<any>(url, req);
  }

  logout(): Observable<any> {
    return this.http.post<any>(ApiURL.getAuthLogoutUrl, {});
  }

  register(req: AuthRegisterRequestModel): Observable<any> {
    return this.http.post<any>(ApiURL.getAuthRegisterUrl, req).pipe(
      tap((response) => {
        //TODO Error Handling
        // let next = getResult(response);
        console.log("Register Response", response);
        // if (next) {
        //   this.isAuthenticated.set(true);
        //   this.claims = next.claims;
        //   this.authProfile.update(state => ({
        //     ...state,
        //     isAdmin: this.hasClaimValue(ClaimType.ROLE, 'Admin') ? true : false,
        //     userName: next.userName,
        //     organisationId: next.organisationId
      })
    );
  }
}
