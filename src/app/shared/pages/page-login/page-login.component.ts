import { Component, computed, inject, signal, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
//Materials
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
//Components
import { LibFormComponent } from "@shared/components";
// Models
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService, SnackbarService } from "@core/services";
import { CRED_FORM_DATA, PageURLConstants } from "@shared/models";

const materialModules = [MatTabsModule, MatIconModule, MatButtonModule];
const formModules = [FormsModule, ReactiveFormsModule];

@Component({
  selector: 'tap-page-login',
  imports: [RouterLink, ...materialModules, ...formModules, LibFormComponent],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.scss'
})
export class PageLoginComponent {
  @ViewChild(LibFormComponent) libForm: LibFormComponent | undefined;

  //Services
  private route = inject(ActivatedRoute);
  authService = inject(AuthService);
  snackbarService = inject(SnackbarService);

  ePageURLConstants = PageURLConstants;

  activeTabIndex = signal<number>(0);
  form: FormGroup = new FormGroup({});
  tabs = CRED_FORM_DATA;
  editMode = signal<boolean>(true);

  currentFormFields = computed(() => {
    this.editMode.set(true);
    return CRED_FORM_DATA[this.activeTabIndex()] ?? [];
  });

  onActionBtnClicked() {
    const request = this.libForm?.onSubmit();
    if (!!request) {
      this.editMode.set(false);
      //Login
      if (this.activeTabIndex() === 0) {
        this.authService.login(request).subscribe({
          next: (response) => {
            console.log('auth resp', response);
            // Failure
            if (response?.status?.isSuccess === false) {
              this.editMode.set(true);
              //TODO Move to constants
              this.snackbarService.error("Login Failed. Invalid credentials.",13500);
              this.libForm?.form.reset();
              return;
            }

            //Success response =>Null for Cookie, accesscode
            //TODO handle for Accesstoken
            const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '';
            //Reload App
            window.location.href = `/${returnUrl}`;
          },
          error: (error) => {
            //TODO Log Error
            console.log('auth error', error);
            if (error.status === 0)
              this.snackbarService.error("Server Error. Please try again later.");
            this.editMode.set(true);
          }
        }
        );
      }
    }
  }

}