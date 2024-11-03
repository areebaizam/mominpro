import { Component, inject } from '@angular/core';
//Material
import { MatToolbarModule } from '@angular/material/toolbar';
//Components
import { BtnToggleComponent } from '../btn-toggle/btn-toggle.component';
//Models
import { eBtnToggleType } from '@shared/models'

const components = [BtnToggleComponent];
const materialModules = [MatToolbarModule,];

@Component({
  selector: 'tap-bar-bottom',
  standalone: true,
  imports: [...materialModules, ...components],
  templateUrl: './bar-bottom.component.html',
  styleUrl: './bar-bottom.component.scss'
})
export class BarBottomComponent {
  toggleType = eBtnToggleType.SIDENAV;
}
