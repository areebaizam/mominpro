import { ChangeDetectionStrategy, Component, effect, inject, Input, OnDestroy, OnInit, signal, untracked, viewChild } from '@angular/core';
//Form
import { ControlContainer, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Material
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
//Services
import { FormService } from '@shared/services';
//Models
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { alphanumericbool, AthanModel, ControlType, AthanTypeValue, SelectOptionModel, SeriesModel, AthanType } from '@shared/models';
import { BaseFormField } from '../base-form-field';
//Constants
const formModules = [FormsModule, ReactiveFormsModule, MatFormFieldModule];
const materialModules = [MatInputModule, MatSelectModule, MatRadioModule, MatIconModule];


@Component({
  selector: 'tap-athan-form-field',
  imports: [...formModules, ...materialModules],
  templateUrl: './athan-form-field.component.html',
  styleUrl: './athan-form-field.component.scss',
  providers: [{ provide: MatFormFieldControl, useExisting: AthanFormField }, provideNativeDateAdapter(),
  {
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true })
  }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AthanFormField extends BaseFormField<AthanTypeValue> implements OnInit, OnDestroy {

  protected override isEmptyValue(value: AthanTypeValue | null): boolean {
    return !value?.type && !value?.value;
  }

  @Input({ required: true }) control!: AthanModel;
  @Input() editMode: boolean | undefined = true;

  options = signal<SelectOptionModel[]>([]);
  readonly typeInput = viewChild.required<HTMLInputElement>('type');
  readonly valueInput = viewChild.required<HTMLInputElement>('value');
  formService = inject(FormService);

  ngOnInit() {
    this.getOptions(this.control.value.type);
    this.form.setValue(this.control.value);
    this.valueControl.setValidators(this.formService.getValidators(this.control.validators));
  }

  getOptions(type: AthanType) {
    let controlModel = this.control.options.find(o => o.subtype === type)?.control as SeriesModel;
    this.options.set(this.formService.getSeriesOptions(controlModel));
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
      const value = this._value() || new AthanTypeValue('iqamah', null);
      untracked(() => this.form.setValue(value));
    });

    this.form.statusChanges.pipe(takeUntilDestroyed()).subscribe((x) => {
      this.stateChanges.next();
    });

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (this.form.touched)
        this.touched.set(true);

      if (this._value() && (value.type != this._value()?.type)) {
        //TODO Handle focus Read Material guideline
        this.getOptions(value.type);
        this.form.patchValue({ value: null }, { emitEvent: false });
      }

      const timeOffset = (this.form.enabled && this.form.valid) || this.form.value ? new AthanTypeValue(this.form.value.type ?? 'iqamah', this.form.value.value ?? null)
        : new AthanTypeValue(this.form.value.type || 'iqamah', null);
      this._updateValue(timeOffset);
    });
  }

  protected override _updateValue(timeOffset: AthanTypeValue | null) {
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
}
