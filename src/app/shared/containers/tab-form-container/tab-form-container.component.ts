import { Component, Input, output, signal, viewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { BtnTabActionComponent, LibFormComponent } from '@shared/components';
// Models
import { eBtnActionCESType, ReactiveForm } from '@shared/models';
//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const components = [LibFormComponent, BtnTabActionComponent];
@Component({
  selector: 'tap-tab-form-container',
  imports: [...formModules, ...components],
  templateUrl: './tab-form-container.component.html',
  styleUrl: './tab-form-container.component.scss'
})
export class TabFormContainer {
  //Inputs & Outputs
  @Input({ required: true }) libFormsData: ReactiveForm[] = [];
  tabFormValue = output<any>();//TODO Typecast it <T>

  //Child Component
  readonly libForm = viewChild.required(LibFormComponent);

  //Variables
  tabFormGroup: FormGroup = new FormGroup({});
  editMode = signal<boolean>(true);

  canSubmitForms(): boolean {
    return this.libForm().canSubmit;
  }

  onActionBtnClicked(action: eBtnActionCESType) {
    switch (action) {
      case eBtnActionCESType.EDIT:
        this.editMode.set(true);
        break;
      case eBtnActionCESType.CANCEL:
        this.editMode.set(false);
        break;
      case eBtnActionCESType.SAVE:
        if (this.canSubmitForms()) {
          this.tabFormValue.emit(this.tabFormGroup.value);
        }
        break;
      default:
        console.error('Invalid action type', action);//TODO LOG ERROR
    }
  }
}
