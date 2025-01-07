import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
//Components
import { LibFormContainer } from '@shared/pages';
// Models
import { ReactiveForm, IQAMA_FORM_DATA } from '@shared/models';
//Constants
const components = [LibFormContainer];

@Component({
    selector: 'tap-iqama',
    imports: [...components],
    templateUrl: './iqama.component.html',
    styleUrl: './iqama.component.scss'
})
export class IqamaComponent {
  form: FormGroup = new FormGroup({});
  formGroups: ReactiveForm[] = IQAMA_FORM_DATA;
}
