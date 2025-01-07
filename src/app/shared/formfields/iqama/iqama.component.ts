import { ChangeDetectionStrategy, Component, effect, inject, Input, OnDestroy, OnInit, signal, untracked, viewChild } from '@angular/core';
//Form
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseFormField } from '../base-form-field';
//Material
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
//Services
import { FormService } from '@shared/services';
//Models
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { alphanumericbool, ControlType, FormControlModel, IqamaModel, IqamaValue, SelectOptionModel, SeriesModel } from '@shared/models';

//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const materialModules = [MatInputModule, MatSelectModule, MatTimepickerModule, MatRadioModule, MatIconModule];


@Component({
  selector: 'tap-iqama',
  imports: [...formModules, ...materialModules],
  templateUrl: './iqama.component.html',
  styleUrl: './iqama.component.scss',
  providers: [{ provide: MatFormFieldControl, useExisting: IqamaComponent }, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IqamaComponent extends BaseFormField<IqamaValue> implements OnInit, OnDestroy {
  @Input({ required: true }) control!: IqamaModel
  fb = inject(FormBuilder);
  formService = inject(FormService)
  parts: FormGroup<{
    type: FormControl<ControlType | null>;
    value: FormControl<alphanumericbool | null>;
  }> =
    this.fb.group({
      type: ['time' as ControlType],
      value: ['12:30' as alphanumericbool],
    });

  readonly typeInput = viewChild.required<HTMLSelectElement>('type');
  readonly valueInput = viewChild.required<HTMLInputElement>('value');

  options: SelectOptionModel[] = [];

  constructor() {    
    super();    
    effect(() => {
      if (this._disabled()) {
        untracked(() => this.parts.disable());
      } else {
        untracked(() => this.parts.enable());
      }
    });

    effect(() => {
      const value = this._value() || new IqamaValue('time', '');
      untracked(() => this.parts.setValue(value));
    });

    this.parts.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.stateChanges.next();
    });

    this.parts.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
      const iqama = this.parts.valid
        ? new IqamaValue(
          this.parts.value.type || 'time',
          this.parts.value.value || '',
        )
        : null;
      this._updateValue(iqama);
    });
  }

  ngOnInit(): void {
    //TODO fix this logic
    let seriesField = this.control.options[0].control as SeriesModel;
    this.options = this.formService.getSeriesOptions(seriesField);
    console.log(this.control,this.options,this.control.options)
    this.parts = this.fb.group({
      type: [this.control.value.type],
      value: '05:00' as alphanumericbool,
    });
  }
  protected override isEmptyValue(): boolean {
    const { value: { type, value }, } = this.parts;
    return !type && !value;
  }

  protected override isFormFieldInvalid(): boolean {
    return this.parts.invalid;
  }

  protected override _updateValue(value: IqamaValue | null): void {
    const current = this._value();
    if (
      value === current ||
      (value?.type === current?.type &&
        value?.value === current?.value)
    ) {
      return;
    }
    this._value.set(value);
  }

  override setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector('.input-container',)!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  override  onContainerClick() {
    this._focusMonitor.focusVia(this.valueInput(), 'program');
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}