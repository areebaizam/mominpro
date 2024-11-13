import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
//Components
import { LibFormContainer } from '@shared/pages';
// Models
import { ReactiveForm, MOSQUE_FORM_DATA } from '@shared/models';
//Constants
const components = [LibFormContainer];
@Component({
  selector: 'tap-mosque',
  standalone: true,
  imports: [...components],
  templateUrl: './mosque.component.html',
  styleUrl: './mosque.component.scss'
})
export class MosqueComponent {
  form: FormGroup = new FormGroup({});
  formGroups: ReactiveForm[] = MOSQUE_FORM_DATA;
}
