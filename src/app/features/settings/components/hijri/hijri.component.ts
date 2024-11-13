import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
//Components
import { LibFormContainer } from '@shared/pages';
// Models
import { ReactiveForm, HIJRI_FORM_DATA } from '@shared/models';
//Constants
const components = [LibFormContainer];

@Component({
  selector: 'tap-hijri',
  standalone: true,
  imports: [...components],
  templateUrl: './hijri.component.html',
  styleUrl: './hijri.component.scss'
})
export class HijriComponent {
  form: FormGroup = new FormGroup({});
  formGroups: ReactiveForm[] = HIJRI_FORM_DATA;
}
