import { ChangeDetectionStrategy, Component, effect, inject, Input, OnDestroy, OnInit, untracked, viewChild } from '@angular/core';
//Form
import { ControlContainer, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Material
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepicker, MatTimepickerModule } from '@angular/material/timepicker';
//Services
import { FormService } from '@shared/services';
//Models
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { alphanumericbool, ControlType, ControlTypeValue, IqamahModel, SelectOptionModel, SeriesModel } from '@shared/models';
import { BaseFormField } from '../base-form-field';
//Constants
const formModules = [FormsModule, ReactiveFormsModule, MatFormFieldModule];
const materialModules = [MatInputModule, MatSelectModule, MatTimepickerModule, MatRadioModule, MatIconModule];

@Component({
  selector: 'tap-iqamah-form-field',
  imports: [...formModules, ...materialModules],
  templateUrl: './iqamah-form-field.component.html',
  styleUrl: './iqamah-form-field.component.scss',
  providers: [{ provide: MatFormFieldControl, useExisting: IqamahFormField }, provideNativeDateAdapter(),
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
export class IqamahFormField extends BaseFormField<ControlTypeValue> implements OnInit, OnDestroy{
  protected override isEmptyValue(value: ControlTypeValue | null): boolean {
    return !value?.type && !value?.value;
  }

  @Input({ required: true }) control!: IqamahModel;
  @Input() editMode: boolean | undefined = true;

  options: SelectOptionModel[] = [];
  readonly typeInput = viewChild.required<HTMLInputElement>('type');
  readonly valueInput = viewChild.required<HTMLInputElement>('value');
  formService = inject(FormService);

  ngOnInit() {
    let seriesField = this.control.options[0].control as SeriesModel;
    this.options = this.formService.getSeriesOptions(seriesField);
    this.form.setValue(this.control.value);
    this.valueControl.setValidators(this.formService.getValidators(this.control.validators));

  }

  ngAfterViewInit() {
    if (!this.editMode) this.parentFormGroup.disable();
  }

  constructor() {
    super();
    let form = inject(FormBuilder).group({
      type: FormControl<ControlType>,
      value: FormControl<alphanumericbool | null>,
    });

    this.parentFormGroup.addControl(this.key, form);

    effect(() => {
      if (this._disabled()) {
        untracked(() => {
          this.form.disable()
        });
      } else {
        untracked(() => this.form.enable());
      }
    });

    effect(() => {
      const value = this._value() || new ControlTypeValue('time', null);
      untracked(() => this.form.setValue(value));
    });

    this.form.statusChanges.pipe(takeUntilDestroyed()).subscribe((x) => {
      this.stateChanges.next();
    });

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (this.form.touched)
        this.touched.set(true);

      if (this._value() && (value.type != this._value()?.type)) {
        this.form.patchValue({ value: null }, { emitEvent: false });

      }
      const timeOffset = (this.form.enabled && this.form.valid) || this.form.value ? new ControlTypeValue(this.form.value.type ?? 'time', this.form.value.value ?? null)
        : new ControlTypeValue(this.form.value.type || 'time', null);
      this._updateValue(timeOffset);
    });
  }

  protected override _updateValue(timeOffset: ControlTypeValue | null) {
    const current = this._value();
    if (
      timeOffset === current ||
      (timeOffset?.type === current?.type &&
        timeOffset?.value === current?.value)
    ) {
      return;
    }
    this._value.set(timeOffset);
  }

  getMinTimeValue(): string {
    let min = this.control.options.find(x => x.type == 'time')?.control?.validators?.matTimepickerMin;
    return !!min ? min : '00:00';
  }
  getMaxTimeValue(): string {
    let max = this.control.options.find(x => x.type == 'time')?.control?.validators?.matTimepickerMax;
    return !!max ? max : '23:59';
  }
  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
    this.parentFormGroup.removeControl(this.key);
  }

  onContainerClick() {
    if (this.form.valid) {
      this._focusMonitor.focusVia(this.valueInput(), 'program');
    }
    else {
      this._focusMonitor.focusVia(this.typeInput(), 'program');
    }
  }

  getValidationError(): string {
    return this.formService.getValidationError(this.valueControl, this.control.label);
  }

  closeIfDisabled(picker: MatTimepicker<any>) {
    if (this.valueControl.disabled)
      picker.close()
  }
}
