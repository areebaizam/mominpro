import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
//RXJS
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

//Services
import { AuthService } from '@core/services';
// Models
import { APP_NAV_LOGIN_BTN, APP_NAV_PROFILE_BTN, BtnNavModel } from '@shared/models';

//Constants
const materialModules = [MatButtonModule, MatIconModule, MatMenuModule];

@Component({
  selector: 'tap-bar-top-login',
  imports: [RouterLink, ...materialModules],
  templateUrl: './bar-top-login.component.html',
  styleUrl: './bar-top-login.component.scss'
})
export class BarTopLoginComponent {
  authService = inject(AuthService)
  destroyRef = inject(DestroyRef);
  loginBtnData: BtnNavModel = APP_NAV_LOGIN_BTN;
  profileBtnData: BtnNavModel = APP_NAV_PROFILE_BTN;

  onLogoutBtnClicked() {
    this.authService.logout()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (response) => { 
        if(response?.status?.isSuccess === true) {
          //TODO FIX THIS
          window.location.href = `/`;
        }
        console.log('logout resp', response);
      },
      error: (error) => {
        //TODO show error
        console.log('logout error', error);
        //TODO FIX THIS
        if(error.status === 401)
          window.location.href = `/`;
      }
    })
  }
}