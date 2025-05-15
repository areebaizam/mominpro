import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

//Models
import { eBtnActionCESType } from '@shared/models';
//Constants
const materialModules = [MatButtonModule, MatIconModule];
@Component({
  selector: 'tap-btn-tab-action',
  imports: [...materialModules],
  templateUrl: './btn-tab-action.component.html',
  styleUrl: './btn-tab-action.component.scss'
})
export class BtnTabActionComponent {
  editMode = input.required<boolean>();
  output = output<eBtnActionCESType>();
  action = eBtnActionCESType;
}
