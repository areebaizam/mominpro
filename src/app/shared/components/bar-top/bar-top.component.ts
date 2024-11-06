import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
//Components
import { BtnToggleComponent } from '../btn-toggle/btn-toggle.component';
//Services
import { MediaQuery } from '@core/services';
import { SidenavService } from '@shared/services';
//Models
import { eBtnToggleType } from '@shared/models';
//Constants
const materialModules = [MatToolbarModule, MatButtonModule];
const components = [BtnToggleComponent];

@Component({
  selector: 'tap-bar-top',
  standalone: true,
  imports: [RouterLink,...materialModules, ...components],
  templateUrl: './bar-top.component.html',
  styleUrl: './bar-top.component.scss'
})
export class BarTopComponent {
  sidenavService = inject(SidenavService);
  mediaQuery = inject(MediaQuery);
  toggleType = eBtnToggleType;
}
