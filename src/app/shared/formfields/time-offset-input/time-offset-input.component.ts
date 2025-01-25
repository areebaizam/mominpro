import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, HostBinding, inject, input, Input, model, OnDestroy, OnInit, Optional, Self, signal, untracked, viewChild } from '@angular/core';
//Form
import { AbstractControl, AbstractControlDirective, ControlContainer, ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseFormField } from '../base-form-field';
//Material
import { MAT_FORM_FIELD, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
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
import { alphanumericbool, ControlType, FormControlModel, TimeOffsetModel, TimeOffsetValue, SelectOptionModel, SeriesModel } from '@shared/models';
import { Observable, Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
//Constants
const formModules = [FormsModule, ReactiveFormsModule, MatFormFieldModule];
const materialModules = [MatInputModule, MatSelectModule, MatTimepickerModule, MatRadioModule, MatIconModule];
@Component({
  selector: 'tap-time-offset-input',
  imports: [...formModules, ...materialModules],
  templateUrl: './time-offset-input.component.html',
  styleUrl: './time-offset-input.component.scss',
  providers: [{ provide: MatFormFieldControl, useExisting: TimeOffsetInput }, provideNativeDateAdapter(),
  {
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true })
  }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeOffsetInput implements MatFormFieldControl<TimeOffsetValue>, ControlValueAccessor, OnDestroy {
  @Input({ required: true }) control!: TimeOffsetModel;
  parentContainer = inject(ControlContainer);
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  get parentControl() {
    return this.parentFormGroup.controls[this.control.name] as AbstractControl
  }

  options: SelectOptionModel[] = [];
  static nextId = 0;
  readonly typeInput = viewChild.required<HTMLInputElement>('type');
  readonly valueInput = viewChild.required<HTMLInputElement>('value');
  formService = inject(FormService);
  ngControl = inject(NgControl, { optional: true, self: true });
  readonly parts: FormGroup<{
    type: FormControl<ControlType | null>;
    value: FormControl<alphanumericbool | null>;
  }>;
  readonly stateChanges = new Subject<void>();
  readonly touched = signal(false);
  readonly controlType = 'time-offset-input';
  readonly id = `time-offset-input-${TimeOffsetInput.nextId++}`;
  readonly _userAriaDescribedBy = input<string>('', { alias: 'aria-describedby' });
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  readonly _required = input<boolean, unknown>(false, {
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly _disabledByInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  readonly _value = model<TimeOffsetValue | null>(null, { alias: 'value' });
  onChange = (_: any) => { };
  onTouched = () => { };

  protected readonly _formField = inject(MAT_FORM_FIELD, {
    optional: true,
  });

  private readonly _focused = signal(false);
  private readonly _disabledByCva = signal(false);
  private readonly _disabled = computed(() => this._disabledByInput() || this._disabledByCva());
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  get focused(): boolean {
    return this._focused();
  }

  get empty() {
    const { value: { value, type } } = this.parts;
    return !value && !type;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get userAriaDescribedBy() {
    return this._userAriaDescribedBy();
  }

  get placeholder(): string {
    return this._placeholder();
  }

  get required(): boolean {
    return this._required();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  get value(): TimeOffsetValue | null {
    return this._value();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched();
  }

  ngOnInit() {
    let seriesField = this.control.options[0].control as SeriesModel;
    this.options = this.formService.getSeriesOptions(seriesField);
    // console.log('parentFormGroup 1', this.parentFormGroup);
    this.parentFormGroup.removeControl(this.control.name);
    // console.log('parentFormGroup 2', this.parentFormGroup);
    // this.parentFormGroup.addControl(this.control.name);
    console.log('parentFormGroup 3', this.parentFormGroup);
    this.parentFormGroup.addControl(this.control.name,this.parts);
    console.log('parentFormGroup 3', this.parentFormGroup);
  }

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.parts = inject(FormBuilder).group({
      type: ['time' as ControlType, [Validators.required]],
      value: [new Date(0, 0, 0, 0, 0) as alphanumericbool, Validators.required],
    });


    effect(() => {
      // Read signals to trigger effect.
      this._placeholder();
      this._required();
      this._disabled();
      this._focused();
      // Propagate state changes.
      untracked(() => this.stateChanges.next());
    });

    effect(() => {
      if (this._disabled()) {
        untracked(() => {
          this.parts.disable({ emitEvent: false })
        });
      } else {
        untracked(() => this.parts.enable({ emitEvent: false }));
      }
    });

    effect(() => {
      const value = this._value() || new TimeOffsetValue('time', null);
      untracked(() => this.parts.setValue(value));
    });

    this.parts.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.stateChanges.next();
    });

    this.parts.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (this._value() && (value.type != this._value()?.type)) {
        this.parts.patchValue({ value: null }, { emitEvent: false });
      }
      const timeOffset = (this.parts.enabled && this.parts.valid) || this.parts.controls['value'].value ? new TimeOffsetValue(this.parts.value.type || 'time', this.parts.value.value || null)
        : new TimeOffsetValue(this.parts.controls['type'].value || 'time', null);

      // this.parentControl.setValue(timeOffset);
      this._updateValue(timeOffset);
    });
  }

  private _updateValue(timeOffset: TimeOffsetValue | null) {
    const current = this._value();
    if (
      timeOffset === current ||
      (timeOffset?.type === current?.type &&
        timeOffset?.value === current?.value)
    ) {
      return;
    }
    this._value.set(timeOffset);
    this.parentControl.setValue(timeOffset);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn() {
    if (!this._focused()) {
      this._focused.set(true);
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched.set(true);
      this._focused.set(false);
      this.onTouched();
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.input-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.type.valid) {
      this._focusMonitor.focusVia(this.valueInput(), 'program');
    }
    else {
      this._focusMonitor.focusVia(this.typeInput(), 'program');
    }
  }

  writeValue(timeOffset: TimeOffsetValue | null): void {
    this._updateValue(timeOffset);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByCva.set(isDisabled);
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }


}
