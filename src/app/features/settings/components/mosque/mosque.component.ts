import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { LibFormComponent } from '@shared/components';
import { MOSQUE_FORM_ADDRESS_DATA, MOSQUE_FORM_CONTACT_DATA, MOSQUE_FORM_GENERAL_DATA } from '@shared/models';
//Constants
const formModules = [FormsModule, ReactiveFormsModule];
const components = [LibFormComponent];
@Component({
  selector: 'tap-mosque',
  standalone: true,
  imports: [...formModules, ...components],
  templateUrl: './mosque.component.html',
  styleUrl: './mosque.component.scss'
})
export class MosqueComponent implements OnInit {


  fb = inject(FormBuilder);
  form = this.fb.group({});
  generalFields = MOSQUE_FORM_GENERAL_DATA;
  addressFields = MOSQUE_FORM_ADDRESS_DATA;
  contactFields = MOSQUE_FORM_CONTACT_DATA;

  ngOnInit(): void {
  }
}
