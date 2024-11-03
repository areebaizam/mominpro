import { Component, inject } from '@angular/core';
//Material
import { MatToolbarModule } from '@angular/material/toolbar';
//Components
import { BtnToggleComponent } from '../btn-toggle/btn-toggle.component';
//Services
import { MediaQuery } from '@core/services';
//Models
import { eBtnToggleType } from '@shared/models'
const components = [BtnToggleComponent];
const materialModules = [MatToolbarModule,];

@Component({
  selector: 'tap-bar-top',
  standalone: true,
  imports: [...materialModules, ...components],
  templateUrl: './bar-top.component.html',
  styleUrl: './bar-top.component.scss'
})
export class BarTopComponent {
  mediaQuery = inject(MediaQuery);
  toggleType = eBtnToggleType.SIDENAV;
}
