import { FocusMonitor } from '@angular/cdk/a11y';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, Input, input, model, OnDestroy, OnInit, signal, untracked, viewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
//Material
import { MAT_FORM_FIELD, MatFormFieldControl, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTimepickerModule } from '@angular/material/timepicker';

//RXJS
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs/internal/Subject';
// Services
import { FormService } from '@shared/services';
//Models
import { alphanumericbool, InputToggleModel, InputToggleValue, SelectOptionModel } from '@shared/models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';
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
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],

})

export class InputToggleFormField extends BaseFormFieldComponent<InputToggleValue> implements OnInit {
  @Input({ required: true }) control!: InputToggleModel;

  parentContainer = inject(ControlContainer);

  get parentFormGroup(): FormGroup | null {
    return this.parentContainer.control as FormGroup ?? null;
  }

  override readonly form = new FormGroup({
    checked: new FormControl<boolean | null>(false),
    value: new FormControl<alphanumericbool | null>(null, Validators.required),
  })


  //Form Control Aliases
  get toggleControl() {
    return this.form.get('checked') as FormControl;
  }
  get valueControl() {
    return this.form.get('value') as FormControl;
  }
  // Services
  private readonly formService = inject(FormService);
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
  readonly toggleInput = viewChild.required<HTMLInputElement>('toggle');
  readonly valueInput = viewChild.required<HTMLInputElement>('value');


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
    if (this.parentFormGroup && this.formGroupName)
      (this.parentFormGroup?.get(this.formGroupName) as FormGroup).addControl(this.control.name, this.form);
  }

  getValidationError(): string {
    return this.formService.getValidationError(this.valueControl, this.control.label);
  }

  canSubmit(): boolean {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    return this.form.valid;
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
