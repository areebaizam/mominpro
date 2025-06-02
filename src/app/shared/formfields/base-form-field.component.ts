import { FocusMonitor } from '@angular/cdk/a11y';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, Input, input, model, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, ControlValueAccessor, FormGroup, NgControl } from '@angular/forms';
import { MAT_FORM_FIELD, MatFormFieldControl } from '@angular/material/form-field';
import { FormService } from '@shared/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'tap-base-form-field',
  imports: [],
  template: ``,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class BaseFormFieldComponent<T> implements ControlValueAccessor, MatFormFieldControl<T> {
  @Input({ required: true }) formGroupName!: string;

  protected readonly parentContainer = inject(ControlContainer, { skipSelf: true });

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }
  
  // Services
  protected readonly formService = inject(FormService);

  static nextId = 0;
  readonly  = 'tap-base-form-field';
  readonly id = `tap-base-form-field-${BaseFormFieldComponent.nextId++}`;
  readonly _userAriaDescribedBy = input<string>('', { alias: 'aria-describedby' });
  readonly _placeholder = input<string>('', { alias: 'placeholder' });
  readonly _required = input<boolean, unknown>(false, { alias: 'required', transform: booleanAttribute, });
  readonly _disabledByInput = input<boolean, unknown>(false, { alias: 'disabled', transform: booleanAttribute, });
  readonly _value = model<T | null>(null, { alias: 'value' });
  readonly stateChanges = new Subject<void>();
  readonly touched = signal(false);
  protected readonly _formField = inject(MAT_FORM_FIELD, { optional: true, });
  private readonly _focused = signal(false);
  protected readonly _disabled = computed(() => this._disabledByInput() || this._disabledByCva());
  protected readonly _focusMonitor = inject(FocusMonitor);
  protected readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly form: FormGroup = new FormGroup({});


  ngControl = inject(NgControl, { optional: true, self: true });

  onChange = (_: any) => { };
  onTouched = () => { };
  private readonly _disabledByCva = signal(false);
  protected abstract _updateValue(value: T | null): void;
  protected abstract isEmptyValue(): boolean;
  abstract onContainerClick(event: MouseEvent): void;
  abstract setDescribedByIds(ids: string[]): void;

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

  get value(): T | null {
    return this._value();
  }

  get errorState(): boolean {
    return this.form.invalid && this.touched();
  }

  get empty() {
    return this.value === undefined || this.isEmptyValue();
  }

  writeValue(value: T | null): void {
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

  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

}
