import { FocusMonitor } from '@angular/cdk/a11y';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, Input, input, model, OnDestroy, signal, untracked, viewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
//Material
import { MAT_FORM_FIELD, } from '@angular/material/form-field';
import { MatFormFieldControl, } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
//RXJS
import { Subject } from 'rxjs/internal/Subject';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// Services
import { FormService } from '@shared/services';
//Models
import { alphanumericbool, FlagModel, SelectOptionModel } from '@shared/models';
//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const materialModules = [MatSelectModule, MatSlideToggleModule];

export class InputToggle {
  constructor(
    public isDisabled: boolean | null,
    public value: alphanumericbool | null,
  ) { }
}

@Component({
  selector: 'tap-input-toggle-form-field',
  imports: [...formModules, ...materialModules],
  templateUrl: './input-toggle-form-field.component.html',
  styleUrl: './input-toggle-form-field.component.scss',
  providers: [
    { provide: MatFormFieldControl, useExisting: InputToggleFormField },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputToggleFormField implements ControlValueAccessor, MatFormFieldControl<InputToggle>, OnDestroy {
  @Input({ required: true }) control!: FlagModel;

  readonly form = new FormGroup({
    isDisabled: new FormControl<boolean | null>(false),
    value: new FormControl<alphanumericbool | null>(null, Validators.required),

  })

  //Form Control Aliases
  get toggleControl() {
    return this.form.get('isDisabled') as FormControl;
  }
  get valueControl() {
    return this.form.get('value') as FormControl;
  }
  // Services
  private readonly formService = inject(FormService);
  //Variables
  options: SelectOptionModel[] = [];

  //HTML ELements
  readonly toggleInput = viewChild.required<HTMLInputElement>('toggle');
  readonly valueInput = viewChild.required<HTMLInputElement>('value');

  static nextId = 0;
  ngControl = inject(NgControl, { optional: true, self: true });
  readonly stateChanges = new Subject<void>();
  readonly touched = signal(false);
  readonly controlType = 'tap-input-toggle-form-field';
  readonly id = `tap-input-toggle-form-field-${InputToggleFormField.nextId++}`;
  readonly _userAriaDescribedBy = input<string>('', { alias: 'aria-describedby' });
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  readonly _required = input<boolean, unknown>(false, { alias: 'required', transform: booleanAttribute, });
  readonly _disabledByInput = input<boolean, unknown>(false, { alias: 'disabled', transform: booleanAttribute, });
  readonly _value = model<InputToggle | null>(null, { alias: 'value' });

  onChange = (_: any) => { };
  onTouched = () => { };

  protected readonly _formField = inject(MAT_FORM_FIELD, { optional: true, });

  private readonly _focused = signal(false);
  private readonly _disabledByCva = signal(false);
  private readonly _disabled = computed(() => this._disabledByInput() || this._disabledByCva());
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  get focused(): boolean {
    return this._focused();
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

  get value(): InputToggle | null {
    return this._value();
  }

  get empty() {
    const { value: { isDisabled, value }, } = this.form;
    return isDisabled == null && !value;
  }

  get errorState(): boolean {
    return this.form.invalid && this.touched();
  }

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

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
        untracked(() => this.form.disable());
      } else {
        untracked(() => this.form.enable());
      }
    });

    effect(() => {
      const value = this._value();
      if (value) {
        untracked(() => this.form.setValue(value));
      }
    });

    this.form.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.stateChanges.next();
    });

    //  this.parts.valueChanges.pipe(takeUntilDestroyed()).subscribe(value => {
    //   //Here's the problem
    //   const tel = this.parts.valid
    //     ? new MyTel(
    //         this.parts.value.area || '',
    //         this.parts.value.exchange || '',
    //         this.parts.value.subscriber || '',
    //       )
    //     : null;
    //   this._updateValue(tel); 
    // });
  }

  ngOnInit() {
    this.options = this.formService.getSeriesOptions(this.control.series);
  }

  getValidationError(): string {
    return this.formService.getValidationError(this.valueControl, this.control.label);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  canSubmit(): boolean {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    return this.form.valid;
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

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.tap-input-toggle-form-field-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    //todo add more condition
    this._focusMonitor.focusVia(this.valueInput(), 'program');
  }

  writeValue(value: InputToggle | null): void {
    this._updateValue(value);
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

  private _updateValue(value: InputToggle | null) {
    const current = this._value();
    if (
      value === current ||
      (current?.isDisabled === current?.isDisabled &&
        current?.value === current?.value)
    ) {
      return;
    }
    this._value.set(value);
  }
}
