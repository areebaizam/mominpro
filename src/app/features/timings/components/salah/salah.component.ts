import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
//Components
import { LibFormContainer } from '@shared/pages';
// Models
import { ReactiveForm, SALAH_FORM_DATA } from '@shared/models';
//Constants
const components = [LibFormContainer];

@Component({
    selector: 'tap-salah',
    imports: [...components],
    templateUrl: './salah.component.html',
    styleUrl: './salah.component.scss'
})
export class SalahComponent {
  form: FormGroup = new FormGroup({});
  formGroups: ReactiveForm[] = SALAH_FORM_DATA;

}
