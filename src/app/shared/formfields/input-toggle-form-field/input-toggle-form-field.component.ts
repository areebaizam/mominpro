import { Component, Input, OnInit, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
//Material
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTimepickerModule } from '@angular/material/timepicker';
//RXJS
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//Models
import { alphanumericbool, InputToggleModel, InputToggleValue, SelectOptionModel } from '@shared/models';
import { BaseFormFieldComponent } from '../base-form-field.component';
//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const materialModules = [MatSelectModule, MatSlideToggleModule, MatTimepickerModule, MatInputModule];


@Component({
  selector: 'tap-input-toggle-form-field',
  imports: [...formModules, ...materialModules],
  templateUrl: './input-toggle-form-field.component.html',
  styleUrl: './input-toggle-form-field.component.scss',
  providers: [
    { provide: MatFormFieldControl, useExisting: InputToggleFormField },
  ],


})

export class InputToggleFormField extends BaseFormFieldComponent<InputToggleValue> implements OnInit {
  @Input({ required: true }) control!: InputToggleModel;

  override readonly form = new FormGroup({
    checked: new FormControl<boolean | null>(false),
    value: new FormControl<alphanumericbool | null>(null, Validators.required),
  })


  //Form Control Aliases
  get toggleControl(): FormControl<boolean | null> {
    return this.form.get('checked') as FormControl;
  }
  get valueControl(): FormControl<alphanumericbool | null> {
    return this.form.get('value') as FormControl;
  }

  
  //Variables
  options: SelectOptionModel[] = [];
  //TODO move to utility
  // getMinTimeValue(): string {
  //   let min = this.control.data.validators?.matTimepickerMin;
  //   return !!min ? min : '00:00';
  // }
  // getMaxTimeValue(): string {
  //   let max = this.control.data.validators?.matTimepickerMax;
  //   return !!max ? max : '23:59';
  // }

  //HTML ELements
  readonly toggleInput = viewChild.required('toggle');
  readonly valueInput = viewChild.required<HTMLSelectElement>('value');


  constructor() {
    super();
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      const inputToggleValue = new InputToggleValue(
        this.form.value.checked || this.control.value.checked,
        this.form.getRawValue().value || this.control.value.value,
      )
      this._updateValue(inputToggleValue);
    });

    this.toggleControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      if (this.form.disabled) return;
      if (!value) {
        this.valueControl.disable({ emitEvent: false });
      }
      else
        this.valueControl.enable({ emitEvent: false });
    });
  }

  ngOnInit() {
    let seriesProperties = this.control.props;
    if (!!seriesProperties) {
      this.options = this.formService.getSeriesOptions(seriesProperties);
    }
    let parentGroup = this.parentFormGroup.get(this.formGroupName) as FormGroup;
    parentGroup.addControl(this.control.name, this.form);
  }

  getValidationError(): string {
    return this.formService.getValidationError(this.valueControl, this.control.label);
  }

  protected override isEmptyValue(): boolean {
    const { value: { checked, value }, } = this.form;
    return checked == null && !value;
  }

  onContainerClick() {
    //todo add more condition
    this._focusMonitor.focusVia(this.valueInput(), 'program');
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.tap-base-form-field-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  protected override _updateValue(value: InputToggleValue | null) {
    const current = this._value();
    if (
      value === current ||
      (current?.checked === value?.checked &&
        current?.value === value?.value)
    ) {
      return;
    }
    this._value.set(value);
  }
}
