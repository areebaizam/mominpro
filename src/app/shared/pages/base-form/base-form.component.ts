import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { LibFormComponent } from '@shared/components';
// Models
import { eBtnActionCESType, ReactiveForm } from '@shared/models';
//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const components = [LibFormComponent];
@Component({
  selector: 'tap-base-form',
  imports: [...formModules, ...components],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.scss'
})
export class BaseFormComponent {
  @Output() toggleEditMode = new EventEmitter<boolean>();

  editMode: boolean = false;
  form: FormGroup = new FormGroup({});
  forms: ReactiveForm[] = [];

  actionButtonClicked(action: eBtnActionCESType) {
    switch (action) {
      case eBtnActionCESType.EDIT:
        this.edit();
        break;
      case eBtnActionCESType.CANCEL:
        this.cancel();
        break;
      case eBtnActionCESType.SAVE:
        this.save();
        break;
    }
  }

  private cancel() {
    this.disable();
  }

  private save() {
    this.form.markAsTouched();
    this.form.updateValueAndValidity();
    
    console.log('save',this.form.value, this.form, this.form.valid);
    if (!this.canSave())
      return;    
    this.disable();
  }

  private edit() {
    this.form.markAsUntouched();
    this.form.enable();
    this.editMode = true;
    this.toggleEditMode.emit(this.editMode);
  }

  private disable() {
    this.editMode = false;
    this.toggleEditMode.emit(this.editMode);
    this.form.disable();
  }

  private canSave(): boolean {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    return this.form.valid;
  }
}
