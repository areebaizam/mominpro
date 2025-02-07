import { ChangeDetectionStrategy, Component, effect, inject, Input, OnDestroy, OnInit, signal, untracked, viewChild } from '@angular/core';
//Form
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Material
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
//Services
import { FormService } from '@shared/services';
//Models
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { alphanumericbool, FlagModel, AthanType, FlagTypeValue, SelectOptionModel, SeriesModel } from '@shared/models';
import { BaseFormField } from '../base-form-field';
//Constants
const formModules = [FormsModule, ReactiveFormsModule, MatFormFieldModule];
const materialModules = [MatInputModule, MatSelectModule, MatSlideToggleModule, MatIconModule];

@Component({
  selector: 'tap-flag-form-field',
  imports: [...formModules, ...materialModules],
  templateUrl: './flag-form-field.component.html',
  styleUrl: './flag-form-field.component.scss',
  providers: [{ provide: MatFormFieldControl, useExisting: FlagFormField },
  {
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true })
  }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlagFormField extends BaseFormField<FlagTypeValue> implements OnInit, OnDestroy {
  //Input
  @Input({ required: true }) control!: FlagModel;
  @Input() editMode: boolean | undefined = true;
  //Services
  formService = inject(FormService);
  //HTML ELements  
  readonly typeInput = viewChild.required<HTMLInputElement>('type');
  readonly valueInput = viewChild.required<HTMLInputElement>('value');
  //Variables
  options: SelectOptionModel[] = [];

  ngOnInit() {
    let seriesField = this.control.series as SeriesModel;
    this.options = this.formService.getSeriesOptions(seriesField);
    this.form.setValue(this.control.value);
    console.log('ngOnInit', this.form.value)
    this.valueControl.setValidators(this.formService.getValidators(this.control.validators));
  }

  ngAfterViewInit() {
    if (!this.editMode) this.parentFormGroup.disable();
  }

  constructor() {
    super();
    let form = new FormGroup({
      type: new FormControl<boolean>(false),
      value: new FormControl<alphanumericbool | null>(null),
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
      const value = this._value() || new FlagTypeValue(false, 0);
      untracked(() => this.form.setValue(value));
    });

    this.form.statusChanges.pipe(takeUntilDestroyed()).subscribe((x) => {
      this.stateChanges.next();
    });

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value: FlagTypeValue) => {
      if (this.form.touched)
        this.touched.set(true);
      
      const flagValue = (this.form.enabled && this.form.valid) || this.form.value ? new FlagTypeValue(this.form.value.type ?? false, this.form.value.value ?? 0)
        : new FlagTypeValue(false, 0);
      this._updateValue(flagValue);
    });
  }

  protected override isEmptyValue(value: FlagTypeValue | null): boolean {
    return !value?.type && !value?.value;
  }

  protected override _updateValue(flagValue: FlagTypeValue | null) {
    const current = this._value();
    if (
      flagValue === current ||
      (flagValue?.type === current?.type &&
        flagValue?.value === current?.value)
    ) {
      return;
    }
    this._value.set(flagValue);
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

