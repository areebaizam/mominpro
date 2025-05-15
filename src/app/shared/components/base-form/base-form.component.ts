import { Component, input, model, output, QueryList, signal, ViewChildren } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { BtnTabActionComponent, LibFormComponent } from '@shared/components';
// Models
import { eBtnActionCESType, ReactiveForm } from '@shared/models';
//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const components = [LibFormComponent, BtnTabActionComponent];
@Component({
  selector: 'tap-base-form',
  imports: [...formModules, ...components],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.scss'
})
export class BaseFormComponent {
  //Child Components
  @ViewChildren('libForm') libForms!: QueryList<LibFormComponent>;
  //Inputs & Outputs
  forms  = input.required<ReactiveForm[]>();
  formValue = output<any>();//TODO Typecast it <T>
  //Variables
  
  editMode = signal<boolean>(true);
  form: FormGroup = new FormGroup({});

  canSubmitForms(): boolean {
    return this.libForms.toArray().every(lib => lib.canSubmit())
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
          this.formValue.emit(this.form.value);
        }
        break;
      default:
        console.error('Invalid action type',action);//TODO LOG ERROR
    }
  }
}
