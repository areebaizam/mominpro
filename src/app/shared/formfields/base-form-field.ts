import { FocusMonitor } from '@angular/cdk/a11y';
import { booleanAttribute, computed, Directive, effect, ElementRef, inject, input, model, signal, untracked } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD, MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

const formModules = [FormsModule, ReactiveFormsModule];
@Directive({
    standalone: false
})
export abstract class BaseFormField<T> implements ControlValueAccessor, MatFormFieldControl<T> {
  static nextId = 0;
  readonly _value = model<T | null>(null, { alias: 'value' });
  readonly stateChanges = new Subject<void>();
  readonly id = `base-form-field-${BaseFormField.nextId++}`;
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  ngControl = inject(NgControl, { optional: true, self: true });
  private readonly _focused = signal(false);
  readonly _required = input<boolean, unknown>(false, {
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly _disabledByInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  private readonly _disabledByCva = signal(false);
  protected readonly _disabled = computed(() => this._disabledByInput() || this._disabledByCva());
  readonly controlType = 'base-formfield';
  readonly touched = signal(false);
  readonly _userAriaDescribedBy = input<string>('', { alias: 'aria-describedby' });
  //Protected Fields
  protected readonly _focusMonitor = inject(FocusMonitor);
  protected readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly _formField = inject(MAT_FORM_FIELD, {
    optional: true,
  });
  get value(): T | null {
    return this._value();
  }
  get placeholder(): string {
    return this._placeholder();
  }
  get focused(): boolean {
    return this._focused();
  }

  get empty(): boolean {
    return this.value === undefined || this.value === '' || this.isEmptyValue(this.value);
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  get required(): boolean {
    return this._required();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  get errorState(): boolean {
    return this.isFormFieldInvalid() && this.touched();
  }

  get userAriaDescribedBy() {
    return this._userAriaDescribedBy();
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
  }

  protected onChange: (value: T | null) => void = () => { };
  protected onTouched: () => void = () => { };

  writeValue(value: T | null): void {
    this._updateValue(value);;
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

  protected abstract _updateValue(value: T | null): void;
  // autofilled?: boolean | undefined;
  // userAriaDescribedBy?: string | undefined;
  // disableAutomaticLabeling?: boolean | undefined;

  /**
   * Override this method in subclasses to define.
   */
  protected abstract isEmptyValue(value: T | null): boolean;
  protected abstract isFormFieldInvalid(): boolean;
  abstract setDescribedByIds(ids: string[]): void;
  abstract onContainerClick(event: MouseEvent): void;
}
