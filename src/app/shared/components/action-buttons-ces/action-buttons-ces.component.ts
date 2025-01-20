import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

//Models
import { eBtnActionCESType } from '@shared/models';
//Constants
const materialModules = [MatButtonModule, MatIconModule];
@Component({
  selector: 'tap-action-buttons-ces',
  imports: [...materialModules],
  templateUrl: './action-buttons-ces.component.html',
  styleUrl: './action-buttons-ces.component.scss'
})

export class ActionButtonsCESComponent {
  editMode = input<boolean>();
  output = output<eBtnActionCESType>();
  action = eBtnActionCESType;
}
