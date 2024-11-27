import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
//Pipes
import { JsonPipe } from '@angular/common';
//Components
import { LibFormContainer } from '@shared/pages';
// Models
import { ReactiveForm, IQAMA_FORM_DATA } from '@shared/models';
//Constants
const pipes = [JsonPipe];
const components = [LibFormContainer];

@Component({
  selector: 'tap-iqama',
  standalone: true,
  imports: [...pipes,...components],
  templateUrl: './iqama.component.html',
  styleUrl: './iqama.component.scss'
})
export class IqamaComponent {
  form: FormGroup = new FormGroup({});
  formGroups: ReactiveForm[] = IQAMA_FORM_DATA;
}
