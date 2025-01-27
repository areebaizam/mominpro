import { inject, Injectable } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
//Models
import {
  ControlType,
  FormControlModel,
  InputType,
  SelectOptionModel,
  SeriesModel,
  ValidatorModel,
} from "@shared/models";

@Injectable({ providedIn: "root", })

export class FormService {
  fb = inject(FormBuilder);
  options: SelectOptionModel[] = [];

  getSeriesOptions(field: SeriesModel): SelectOptionModel[] {
    this.options = [];
    let min = field.validators?.min;
    let max = field.validators?.max;
    let suffix = '';

    if ((min || min == 0) && (max || max == 0)) {
      for (let i = min; i <= max; i++) {
        if (min < 0)
          suffix = i < 0 ? 'early' : 'late';
        let label = `${Math.abs(i)} ${field.suffix} ${suffix}`;
        let recommended: boolean = false;
        if (!i) label = field.baseLabel;
        else if (i * i == 1) label = `${Math.abs(i)} ${field.suffixUnit} ${suffix}`;

        if (
          (field.recommendedValue || field.recommendedValue == 0) &&
          i == field.recommendedValue
        ) {
          recommended = true;
          label = `${label} (Recommended)`;
        }

        this.options.push({
          value: i,
          name: label,
          recommended: recommended,
        });
      }
    }
    return this.options;
  }

  buildformControls(formFields: FormControlModel[]): FormGroup {
    let form = this.fb.group({});
    formFields.forEach((control: FormControlModel) => {
      const newControl = new FormControl(
        control.value,
        this.getValidators(control.validators)
      );
      form.addControl(control.name, newControl);
    });
    return form;
  }

  private getValidators(
    validators: ValidatorModel | null
  ): ValidatorFn[] | null {
    if (!validators) return null;
    let validatorFn: ValidatorFn[] = [];
    if (validators.required) validatorFn.push(Validators.required);
    if (validators.requiredTrue) validatorFn.push(Validators.requiredTrue);
    if (validators.min) validatorFn.push(Validators.min(validators.min));
    if (validators.minLength)
      validatorFn.push(Validators.minLength(validators.minLength));
    if (validators.max) validatorFn.push(Validators.max(validators.max));
    if (validators.maxLength)
      validatorFn.push(Validators.maxLength(validators.maxLength));
    if (validators.email) validatorFn.push(Validators.email);
    if (validators.pattern)
      validatorFn.push(Validators.pattern(validators.pattern));
    return validatorFn;
  }

  isInputType(type: ControlType): InputType | null {
    let isInputType = [
      "color",
      "date",
      "datetime-local",
      "email",
      "month",
      "number",
      "password",
      "search",
      "tel",
      "text",
      "time",
      "url",
      "week",
    ].includes(type);
    return isInputType ? (type as InputType) : null;
  }

  getValidationError(control: AbstractControl | null, fieldName: string): string {
    let errors = control?.errors;
    if (!errors)
      return '';
    const errorMessages: string[] = [];
    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName)) {
        errorMessages.push(this.getErrorMessage(errorName, errors[errorName], fieldName));
      }
    }
    return errorMessages[0];
  }

  private getErrorMessage(errorName: string, errorValue: any, fieldName: string): string {
    const messages: { [key: string]: string } = {
      required: `${fieldName} cannot be left blank`,
      minlength: `${fieldName} must be at least ${errorValue.requiredLength} characters long`,
      maxlength: `${fieldName} cannot exceed ${errorValue.requiredLength} characters`,
      max: `${fieldName} value cannot exceed ${errorValue.max}`,
      min: `${fieldName} value must be atleast  ${errorValue.min}`,
      email: 'Enter a valid email address',
      pattern: `The format of ${fieldName} is incorrect`,
    };

    // Default fallback if error is not mapped
    return messages[errorName] || 'Invalid field.';
  }

}
