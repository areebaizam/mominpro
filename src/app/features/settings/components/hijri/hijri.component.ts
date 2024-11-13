import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { LibFormComponent } from '@shared/components';
import { HIJRI_FORM_DATA } from '@shared/models';
//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const components = [LibFormComponent];
@Component({
  selector: 'tap-hijri',
  standalone: true,
  imports: [...formModules, ...components],
  templateUrl: './hijri.component.html',
  styleUrl: './hijri.component.scss'
})
export class HijriComponent {
  fb = inject(FormBuilder);
  form = this.fb.group({});
  hijriFields = HIJRI_FORM_DATA;
  
}
