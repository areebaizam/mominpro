import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
//Components
import { LibFormContainer } from '@shared/pages';
// Models
import { ReactiveForm, ATHAN_FORM_DATA } from '@shared/models';
//Constants
const components = [LibFormContainer];


@Component({
  selector: 'tap-athan',
  standalone: true,
  imports: [...components],
  templateUrl: './athan.component.html',
  styleUrl: './athan.component.scss'
})
export class AthanComponent {
  form: FormGroup = new FormGroup({});
  formGroups: ReactiveForm[] = ATHAN_FORM_DATA;

}
