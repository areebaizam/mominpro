import { FocusMonitor } from "@angular/cdk/a11y";
import { booleanAttribute, computed, Directive, effect, ElementRef, inject, input, model, signal, untracked } from "@angular/core";
import { ControlContainer, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl } from "@angular/forms";
import { MAT_FORM_FIELD, MatFormFieldControl } from "@angular/material/form-field";
import { Subject } from "rxjs";

@Directive({
  standalone: false
})
export abstract class BaseFormFieldOld<T> implements ControlValueAccessor, MatFormFieldControl<T> {

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

  protected key: string = '';

  static nextId = 0;
  readonly _value = model<T | null>(null, { alias: 'value' });
  readonly stateChanges = new Subject<void>();
  readonly id = `base-form-field-${BaseFormFieldOld.nextId++}`;
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  ngControl = inject(NgControl, { optional: true, self: true });
  private readonly _focused = signal(false);
  readonly _required = input<boolean, unknown>(false, {
    alias: 'required',
    transform: booleanAttribute,
  });
  readonly touched = signal(false);
  readonly _userAriaDescribedBy = input<string>('', { alias: 'aria-describedby' });
  //Protected Fields
  protected readonly _focusMonitor = inject(FocusMonitor);
  protected readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly _formField = inject(MAT_FORM_FIELD, { optional: true, });

  //Optional Fields
  // readonly controlType: string = 'tap-custom-field';
  // autofilled: boolean = false;
  // disableAutomaticLabeling: boolean = true;

  get value(): T | null {
    return this._value();
  }
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }
  get required(): boolean {
    return this._required();
  }
  get placeholder(): string {
    return this._placeholder();
  }
  get focused(): boolean {
    return this._focused();
  }
  get userAriaDescribedBy() {
    return this._userAriaDescribedBy();
  }

  get disabled(): boolean {
    return this._disabled();
  }

  get errorState(): boolean {
    return this.form.invalid && this.touched();
  }

  get empty(): boolean {
    return this.value === undefined || this.isEmptyValue(this.value);
  }

  readonly _disabledByInput = input<boolean, unknown>(false, {
    alias: 'disabled',
    transform: booleanAttribute,
  });
  private readonly _disabledByCva = signal(false);
  protected readonly _disabled = computed(() => this._disabledByInput() || this._disabledByCva());
  protected onChange: (value: T | null) => void = () => { };
  protected onTouched: () => void = () => { };

  protected abstract _updateValue(value: T | null): void;
  protected abstract isEmptyValue(value: T | null): boolean;
  abstract onContainerClick(event: MouseEvent): void;

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

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.input-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.key = Object.keys(this.parentFormGroup.controls)[0]
    this.parentFormGroup.removeControl(this.key);

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
}
