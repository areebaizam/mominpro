import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
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
import { IqamaComponent } from '@shared/formfields';
//Models
import { ControlValue, FormControlModel, SelectOptionModel, SeriesModel, ValidatorModel, InputType, ControlType } from '@shared/models';


//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const materialModules = [MatGridListModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatIconModule, MatButtonModule, MatSelectModule, MatSlideToggleModule];
const customControls = [IqamaComponent];

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
  @Input({ required: true }) controlKey!: string;
  @Input({ required: true }) formFields!: FormControlModel[];

  parentContainer = inject(ControlContainer);
  fb = inject(FormBuilder);
  form = this.fb.group({});
  options: { [key: string]: SelectOptionModel[] } = {};
  selected: { [key: string]: ControlValue } = {};

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.getSeriesOptions();
    this.buildformControls()
    this.parentFormGroup.addControl(this.controlKey, this.form);
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

  private getValidators(validators: ValidatorModel | null): ValidatorFn[] | null {
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

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  getFormControl(name: string): FormControl {
    return !!this.form.get(name) ? this.form.get(name) as FormControl : new FormControl();
  }

  private generateSeriesOptions(field: SeriesModel) {
    this.options[field.name] = [];
    let min = field.validators?.min;
    let max = field.validators?.max;

    if ((min || min == 0) && (max || max == 0)) {
      for (let i = min; i <= max; i++) {
        let label = `${i} ${field.suffix}`;
        let recommended: boolean = false;
        if (!i)
          label = field.baseLabel;

        else if (i * i == 1)
          label = `${i} ${field.suffixUnit}`;

        if ((field.recommendedValue || field.recommendedValue == 0) && i == field.recommendedValue) {
          recommended = true;
          label = `${label} (Recommended)`;
        }

        this.options[field.name].push({
          value: i,
          name: label,
          recommended: recommended,
        })
      }
      this.selected[field.name] = field.value;
    }
  }

  private getSeriesOptions() {
    let seriesFields = this.formFields.filter(field => field.type === 'series');
    seriesFields.forEach(field => {
      this.generateSeriesOptions(field);
    })
  }

  getFieldLength(fieldName: string): number {
    return this.form.get(fieldName)?.value?.length || 0;
  }

  isInputType(type: ControlType): InputType | null {
    let isInputType = [
      'color', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week'
    ].includes(type);
    return isInputType ? type as InputType : null;
  }
}
