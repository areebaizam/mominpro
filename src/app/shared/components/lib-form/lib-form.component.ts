import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
//Models
import { FormControlModel, ValidatorModel } from '@shared/models';


//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const materialModules = [MatGridListModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatIconModule, MatButtonModule]

//Reference:https://github.com/DMezhenskyi/shared-angular-forms/blob/implemented/src/app/address-group/address-group.component.ts
@Component({
  selector: 'tap-lib-form',
  standalone: true,
  imports: [...formModules, ...materialModules],
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
  @Input({ required: true }) controlKey!: string;
  @Input({ required: true }) formFields!: FormControlModel[];
  @Input() label = '';

  parentContainer = inject(ControlContainer);
  fb = inject(FormBuilder);
  form = this.fb.group({});

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.buildformControls()
    this.parentFormGroup.addControl(this.controlKey, this.form);
    // console.log('this.parentFormGroup',this.parentFormGroup);
  }

  private buildformControls(): void {
    this.formFields.forEach((control: FormControlModel) => {
      const newControl = new FormControl(
        control.value,
        this.getValidators(control.validators)
      );
      this.form.addControl(control.name, newControl);
    });
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  getFormControl(name: string): FormControl {
    return !!this.form.get(name) ? this.form.get(name) as FormControl : new FormControl();
  }
  isNotMaxLength(name: string): number {
    let length = this.getFormControl(name).value.length;
    let maxLength = this.formFields.find(x => x.name == name)?.validators?.maxLength;
    // if(length && maxLength && length > maxLength)
    return maxLength ? maxLength - length : length;
    // return length;
  }

  getValidators(validators: ValidatorModel | null): ValidatorFn[] | null {
    if (!validators)
      return null;
    let validatorFn: ValidatorFn[] = [];
    if (validators.required)
      validatorFn.push(Validators.required);
    if (validators.requiredTrue)
      validatorFn.push(Validators.requiredTrue);
    if (validators.min)
      validatorFn.push(Validators.min(validators.min));
    if (validators.minLength)
      validatorFn.push(Validators.minLength(validators.minLength));
    if (validators.max)
      validatorFn.push(Validators.max(validators.max));
    if (validators.maxLength)
      validatorFn.push(Validators.maxLength(validators.maxLength));
    if (validators.email)
      validatorFn.push(Validators.email);
    if (validators.pattern)
      validatorFn.push(Validators.pattern(validators.pattern));
    return validatorFn;

  }

  getHintLabel(maxLength: number|undefined): string {
    return maxLength ?'Max ' + maxLength + ' characters' : '';
  }
  getMaxLength(name: string): number {
    let length = this.formFields.find(x => x.name = name)?.validators?.maxLength;
    return length ? length : 0;
  }

  isInputType(type: string): boolean {
    return [
      'color', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week'
    ].includes(type);
  }
}
