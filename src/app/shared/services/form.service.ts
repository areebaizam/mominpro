import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
//Models
import { ControlType, CUSTOM_TYPES, FormControlModel, INPUT_TYPES, InputType, SelectOptionModel, SeriesOptionProperties, ValidatorModel } from "@shared/models";

@Injectable({ providedIn: "root", })

export class FormService {
  fb = inject(FormBuilder);
  options: SelectOptionModel[] = [];

  getSeriesOptions(props: SeriesOptionProperties): SelectOptionModel[] {
    this.options = [];
    let min = props.min;
    let max = props.max;
    let suffix = '';

    if ((min || min == 0) && (max || max == 0)) {
      for (let i = min; i <= max; i++) {
        if (min < 0)
          suffix = i < 0 ? 'early' : 'late';
        let label = `${Math.abs(i)} ${props.suffix} ${suffix}`;
        let recommended: boolean = false;
        if (!i) label = props.baseLabel;
        else if (i * i == 1) label = `${Math.abs(i)} ${props.suffixUnit} ${suffix}`;

        if (
          (props.recommended || props.recommended == 0) &&
          i == props.recommended
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

  buildformControls(form: FormGroup, formFields: FormControlModel[]): void {
    formFields.forEach((control: FormControlModel) => {
      // Placeholder is not added in Form Control
      //Custom ype is not added in Form Control
      if (control.type == "placeholder" || this.isCustomType(control.type))
        return;
      const newControl = new FormControl(
        control.value,
        this.getValidators(control.validators)
      );
      form.addControl(control.name, newControl);
    });
    return;
  }

  getValidators(
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

  isInputType(type: ControlType): type is InputType {
    return (INPUT_TYPES as readonly string[]).includes(type);
  }

  getInputType(type: ControlType): InputType | null {
    return this.isInputType(type) ? type : null;
  }

  isCustomType(type: ControlType): boolean {
    return (CUSTOM_TYPES as readonly string[]).includes(type);
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
      matTimepickerMin: `${fieldName} value is too early`,
      matTimepickerMax: `${fieldName} value is too late`,
      matTimepickerParse: `${fieldName} value isn't a valid time`,
    };
    //TODO Check why Parse is not working
    // Default fallback if error is not mapped
    return messages[errorName] || 'Invalid field.';
  }

}
