import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, Input, model, OnDestroy, signal, untracked, viewChild } from '@angular/core';
//Form
import { AbstractControl, ControlContainer, ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
//Material
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepicker, MatTimepickerModule } from '@angular/material/timepicker';
//Services
import { FormService } from '@shared/services';
//Models
import { FocusMonitor } from '@angular/cdk/a11y';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlType, SelectOptionModel, SeriesModel, TimeOffsetModel, TimeOffsetValue } from '@shared/models';
import { Subject } from 'rxjs';
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
  @Input() editMode: boolean | undefined = true;
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  get form() {
    return this.parentFormGroup.controls[this.key] as FormGroup
  }

  get typeControl() {
    return this.form.get('type') as FormControl;
  }
  
  get valueControl() {
    return this.form.get('value') as FormControl;
  }

  options: SelectOptionModel[] = [];
  static nextId = 0;
  readonly typeInput = viewChild.required<HTMLInputElement>('type');
  readonly valueInput = viewChild.required<HTMLInputElement>('value');
  formService = inject(FormService);
  ngControl = inject(NgControl, { optional: true, self: true });
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

  private key: string = '';

  get focused(): boolean {
    return this._focused();
  }

  get empty() {
    const { value: { value, type } } = this.form;
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
    return this.form.invalid && this.touched();
  }

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
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.key = Object.keys(this.parentFormGroup.controls)[0]
    this.parentFormGroup.removeControl(this.key);
    let form = inject(FormBuilder).group({
      type: ['time'],
      value: [null],
    });

    this.parentFormGroup.addControl(this.key, form);


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
          this.form.disable()
        });
      } else {
        untracked(() => this.form.enable());
      }
    });

    effect(() => {
      const value = this._value() || new TimeOffsetValue('time', null);
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
      const timeOffset = (this.form.enabled && this.form.valid) || this.form.value ? new TimeOffsetValue(this.form.value.type ?? 'time', this.form.value.value ?? null)
        : new TimeOffsetValue(this.form.value.type || 'time', null);
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
  }

  //TODO Get MIN TIME from Calc
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
    if (this.form.valid) {
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

  getValidationError(): string {
    return this.formService.getValidationError(this.valueControl, this.control.label);
  }

  closeIfDisabled(picker: MatTimepicker<any>) {
    if (this.valueControl.disabled)
      picker.close()
  }
}
