import { Component, inject, OnInit, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
//Material
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { PageURLConstants } from "@shared/models";
import { FormService } from "@shared/services";
import { AuthService } from "@core/services";
import { AuthLoginRequestModel, AuthRegisterRequestModel } from "@core/models";
//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const materialModules = [
  MatTabsModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
];
//TODO move to models
export const defaultLoginValues: LoginRegisterValues = {
  name: "",
  email: "",
  password: "",
  rememberMe: false,
};

export interface LoginRegisterValues {
  name: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: "tap-login",
  imports: [RouterLink, ...materialModules, ...formModules],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  fb = inject(FormBuilder);
  formService = inject(FormService);
  authService = inject(AuthService);
  hide = signal(true);
  activeTabId = signal(0);
  ePageURLConstants = PageURLConstants;

  form = this.fb.group({
    name: [defaultLoginValues.name],
    email: [defaultLoginValues.email, [Validators.required, Validators.email]],
    password: [defaultLoginValues.password, [Validators.required]],
    rememberMe: [defaultLoginValues.rememberMe, [Validators.maxLength(100)]],
  });

  getFormControl(name: string): FormControl {
    return !!this.form.get(name)
      ? (this.form.get(name) as FormControl)
      : new FormControl();
  }

  getValidationError(controlName: string): string {
    return this.formService.getValidationError(
      this.getFormControl(controlName),
      controlName
    );
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onTabChange(index: number): void {
    this.form.reset(defaultLoginValues);
    this.hide.set(true);
    this.activeTabId.set(index);
    //TODO remove error on tab change
  }
  onSubmit() {
    //TODO make click as debounce
    // console.log(this.form.value, this.form.valid);
    if (this.canSave()) {
      var req = this.getRequest();
      console.log(req);
      if (this.activeTabId() === 0) {
      this.authService.login(req as AuthLoginRequestModel).subscribe({});
      }
      else {
        this.authService.register(req as AuthRegisterRequestModel).subscribe({
          next: (res) => {
            console.log(res);
          },
        });
      }
    }
  }
  getRequest() {
    const { name, email, password, rememberMe } = this.form.value;
    if (this.activeTabId() === 0) {
      var loginRequest:AuthLoginRequestModel ={
        email: email || "",
        password: password || "",
        rememberMe: rememberMe || false,
      }
      return loginRequest;
    } else{
      var registerRequest:AuthRegisterRequestModel ={
        email: email || "",
        password: password || "",
        name: name || "",        
      }
      return registerRequest;
    }
  }
  private canSave(): boolean {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    return this.form.valid;
  }
}
