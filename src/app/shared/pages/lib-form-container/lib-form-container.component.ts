import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { LibFormComponent } from '@shared/components';
//Models
import { FormControlModel } from '@shared/models';

//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const components = [LibFormComponent];
@Component({
    selector: 'tap-lib-form-container',
    imports: [...formModules, ...components],
    templateUrl: './lib-form-container.component.html',
    styleUrl: './lib-form-container.component.scss'
})
export class LibFormContainer {
  @Input({ required: true }) controlKey!: string;
  @Input({ required: true }) formFields!: FormControlModel[];
  @Input({ required: true }) form!: FormGroup;
  fb = inject(FormBuilder);
  constructor() {
    this.form = this.fb.group({});    
  }
  
}
