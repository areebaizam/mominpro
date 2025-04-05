import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthStatusModel, HttpResponseModel, ApiURL } from '@core/models';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private userRoles: string[] = [];
  isAuthenticated = signal<boolean>(false);

  checkAuthStatus(): Observable<HttpResponseModel<AuthStatusModel>> {
    return this.http.get<HttpResponseModel<AuthStatusModel>>(ApiURL.getAuthStatusUrl)
      .pipe(
        tap(response => {
          let result = this.getResult(response);
          this.isAuthenticated.set(result ? result.isAuthenticated : false);
          this.userRoles = result ? result.claims.filter(claim => claim.type = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role').map(claim => claim.value) : [];
        //   //TODO Move Claims to contants
        }),
        catchError(error => {  
          //TODO Log ERROR
          this.isAuthenticated.set(false); 
          this.userRoles = [];
          return this.handleHttpError<AuthStatusModel>(error);
        })

      );
  }

  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  //TODO move to utility
  getResult<T>(resp: HttpResponseModel<T>): T | null {
    return resp.status.isSuccess ? resp.next : null;
  }

  handleHttpError<T>(error: HttpErrorResponse): Observable<HttpResponseModel<T>> {
    //TODO Log Error
    return of({ errors: null, next: null, status: { isSuccess: false, message: 'Failure', statusCode: error.status, timeStamp: new Date().toISOString() } });
  };
}
