import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { LibFormComponent } from '@shared/components';
import { LOCATION_FORM_COORD_DATA, LOCATION_FORM_TIMEZONE_DATA, LOCATION_FORM_SOLAR_DATA } from '@shared/models';
//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const components = [LibFormComponent];
@Component({
  selector: 'tap-location',
  standalone: true,
  imports: [...formModules, ...components],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  fb = inject(FormBuilder);
  form = this.fb.group({});
  coordinatesFields = LOCATION_FORM_COORD_DATA;
  timezoneFields = LOCATION_FORM_TIMEZONE_DATA;
  solarFields = LOCATION_FORM_SOLAR_DATA;
}
