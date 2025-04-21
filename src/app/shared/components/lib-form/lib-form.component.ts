import { Component, effect, EventEmitter, inject, input, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTimepicker, MatTimepickerModule } from '@angular/material/timepicker';
//Custom Form Fields
import { AthanFormField, FlagFormField, IqamahFormField } from '@shared/formfields';
//Services
import { FormService } from '@shared/services';
//Models
import { FormControlModel } from '@shared/models';

//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const materialModules = [MatGridListModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatCheckboxModule,
  MatIconModule, MatButtonModule, MatSelectModule, MatSlideToggleModule, MatDatepickerModule, MatTimepickerModule];
const customControls = [AthanFormField, IqamahFormField, FlagFormField];

//Reference:https://github.com/DMezhenskyi/shared-angular-forms/blob/implemented/src/app/address-group/address-group.component.ts
@Component({
  selector: 'tap-lib-form',
  imports: [...formModules, ...materialModules, ...customControls],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './lib-form.component.html',
  styleUrl: './lib-form.component.scss'
})
export class LibFormComponent implements OnInit, OnDestroy {

  @Input() formGroupName?: string;
  @Input({ required: true }) formFields!: FormControlModel[];
  editMode = input<boolean>(true);
  @Output() formValue = new EventEmitter<any>();
  
  formService = inject(FormService);
  parentContainer = inject(ControlContainer);
  form: FormGroup = new FormGroup({});
  hide = signal(true);

  get parentFormGroup(): FormGroup | null {
    return this.parentContainer.control as FormGroup ?? null;
  }

  constructor() {
    effect(() => {
      this.editMode() ? this.form.enable() : this.form.disable();
    });

  }

  ngOnInit() {
    this.form = this.formService.buildformControls(this.formFields);
    if (this.parentFormGroup && this.formGroupName)
      this.parentFormGroup.addControl(this.formGroupName, this.form);
  }

  ngOnDestroy() {
    if (this.parentFormGroup?.get(this.formGroupName!))
      this.parentFormGroup.removeControl(this.formGroupName!);
  }

  getFormControl(name: string): FormControl {
    return !!this.form.get(name) ? this.form.get(name) as FormControl : new FormControl();
  }

  getFieldLength(fieldName: string): number {
    return this.form.get(fieldName)?.value?.length || 0;
  }

  getValidationError(field: FormControlModel): string {
    return this.formService.getValidationError(this.form.get(field.name), field.label);
  }

  onSubmit(): any {
    console.log(this.form.value);
    if (!this.isFormValid()) {
      this.formValue.emit(null);
      return null;
    }
    this.formValue.emit(this.form.value);
    return this.form.value;
  }
  private isFormValid(): boolean {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    return this.form.valid;
  }

  closeIfDisabled(picker: MatTimepicker<any>) {
    if (!this.editMode())
      picker.close()
  }

}
