import { Component, Input, OnInit, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
//Material
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTimepickerModule } from '@angular/material/timepicker';
//RXJS
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
//Models
import { alphanumericbool, ControlValue, CustomControlType, OptionSelectModel, OptionSelectValue, SelectOptionModel, SeriesOptionProperties, TimeAttributes } from '@shared/models';
import { BaseFormFieldComponent } from '../base-form-field.component';
//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const materialModules = [MatSelectModule, MatRadioModule, MatTimepickerModule, MatInputModule];


@Component({
  selector: 'tap-option-select-form-field',
  imports: [...formModules, ...materialModules],
  templateUrl: './option-select-form-field.component.html',
  styleUrl: './option-select-form-field.component.scss',
  providers: [
    { provide: MatFormFieldControl, useExisting: OptionSelectFormField },
  ],
})
export class OptionSelectFormField extends BaseFormFieldComponent<OptionSelectValue> implements OnInit {
  @Input({ required: true }) control!: OptionSelectModel;

  override readonly form = new FormGroup({
    option: new FormControl<number | null>(0),
    value: new FormControl<alphanumericbool | null>(null, Validators.required),
  })


  //Form Control Aliases
  get optionControl(): FormControl<number | null> {
    return this.form.get('option') as FormControl;
  }
  get valueControl(): FormControl<alphanumericbool | null> {
    return this.form.get('value') as FormControl;
  }

  //Variables
  options: SelectOptionModel[] = [];
  controlType: CustomControlType = 'series';
  seriesProps?: SeriesOptionProperties;
  timeAttr?: | TimeAttributes;

  //HTML ELements
  readonly optionInput = viewChild.required('option');
  readonly valueInput = viewChild.required<HTMLSelectElement>('value');

  constructor() {
    super();
    
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(({ option, value }) => {
      const currentValue = this._value();

      if (!currentValue) {
        const newValue = new OptionSelectValue(this.control.value.option, this.control.value.value);
        this._updateValue(newValue);
        return;
      }

      if (currentValue.option !== option) {
        this.form.patchValue({ value: null }, { emitEvent: false });
        this.form.markAsUntouched();
        const updatedValue = new OptionSelectValue(this.optionControl.value, null);
        this._updateValue(updatedValue);
      }
    });

    this.optionControl.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      if (this.form.disabled) return;
      let selectedControl = this.control.selectOptions.find(x => x.optionValue == value);
      if (selectedControl) {
        this.controlType = selectedControl.type;
        if (selectedControl.type === 'series') {
          this.seriesProps = selectedControl.attr as SeriesOptionProperties;
          this.options = this.formService.getSeriesOptions(this.seriesProps);
          this.timeAttr = undefined;
        } else if (selectedControl.type === 'time') {
          this.timeAttr = selectedControl.attr as TimeAttributes;
          this.seriesProps = undefined;
        }
      }
    });
  }

  ngOnInit() {
    let parentGroup = this.parentFormGroup.get(this.formGroupName) as FormGroup;
    parentGroup.addControl(this.control.name, this.form);
  }

  getValidationError(): string {
    return this.formService.getValidationError(this.valueControl, this.control.label);
  }

  getSelectedType(): CustomControlType {
    return 'series';
  }
  protected override isEmptyValue(): boolean {
    const { value: { option, value }, } = this.form;
    return !option && !value;
  }

  onContainerClick() {
    //todo add more condition
    this._focusMonitor.focusVia(this.valueInput(), 'program');
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.tap-option-select-form-field-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  protected override _updateValue(value: OptionSelectValue | null) {
    const current = this._value();
    if (
      value === current ||
      (current?.option === value?.option &&
        current?.value === value?.value)
    ) {
      return;
    }
    this._value.set(value);
  }
}
