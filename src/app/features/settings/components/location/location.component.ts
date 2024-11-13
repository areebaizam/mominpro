import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
//Components
import { LibFormContainer } from '@shared/pages';
// Models
import { ReactiveForm, LOCATION_FORM_DATA } from '@shared/models';
//Constants
const components = [LibFormContainer];

@Component({
  selector: 'tap-location',
  standalone: true,
  imports: [...components],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  form: FormGroup = new FormGroup({});
  formGroups: ReactiveForm[] = LOCATION_FORM_DATA;
}
