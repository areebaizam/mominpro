import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
//Custom Form Fields
import { TimeOffsetInput } from '@shared/formfields';
import { IqamaComponent } from '@shared/formfields';
//Services
import { FormService } from '@shared/services';
//Models
import { FormControlModel } from '@shared/models';

//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const materialModules = [MatGridListModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatIconModule, MatButtonModule, MatSelectModule, MatSlideToggleModule];
const customControls = [TimeOffsetInput];

//Reference:https://github.com/DMezhenskyi/shared-angular-forms/blob/implemented/src/app/address-group/address-group.component.ts
@Component({
  selector: 'tap-lib-form',
  imports: [...formModules, ...materialModules, ...customControls],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  templateUrl: './lib-form.component.html',
  styleUrl: './lib-form.component.scss'
})
export class LibFormComponent implements OnInit, OnDestroy {
  @Input() editMode: boolean | undefined = true;
  @Input({ required: true }) controlKey!: string;
  @Input({ required: true }) formFields!: FormControlModel[];

  formService = inject(FormService);
  parentContainer = inject(ControlContainer);
  form: FormGroup = new FormGroup({});
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.form = this.formService.buildformControls(this.formFields);
    if (!this.editMode) this.form.disable();
    this.parentFormGroup.addControl(this.controlKey, this.form);
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  getFormControl(name: string): FormControl {
    return !!this.form.get(name) ? this.form.get(name) as FormControl : new FormControl();
  }

  getFieldLength(fieldName: string): number {
    return this.form.get(fieldName)?.value?.length || 0;
  }

  getValidationError(field: FormControlModel): string {
    let errors = this.form.get(field.name)?.errors;
    if (!!errors)
      return this.formService.getValidationError(errors, field.label);
    return '';
  }

  getFormValidationError(field: FormControlModel): string {
    return this.formService.validateAllFields(this.form.get(field.name) as FormGroup,field.label);
  }

  showValidationError(fieldName: string): boolean {
    let hasError = this.form.get(fieldName)?.invalid && (this.form.get(fieldName)?.dirty || this.form.get(fieldName)?.touched);
    return hasError ? hasError : false;
  }

  onToggle(fieldName: string, value: boolean) {
    //TODO Move it to common Service
    // if (fieldName == 'isHijri')
    //   value ? this.getFormControl('hijri').enable() : this.getFormControl('hijri').disable();
  }

  onSelect(fieldName: string, value: string) {
    if (fieldName == 'method')
      value == 'CUS' ? this.getFormControl('fajr').enable() : this.getFormControl('fajr').disable();
    value == 'CUS' ? this.getFormControl('isha').enable() : this.getFormControl('isha').disable();

  }
}
