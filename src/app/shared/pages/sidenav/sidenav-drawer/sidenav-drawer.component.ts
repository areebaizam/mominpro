import { Component, inject } from '@angular/core';
//Components
import { AppBrandComponent, BtnNavComponent, BtnToggleComponent } from '@shared/components';
//Services
import { MediaQuery } from '@core/services';
import { SidenavService } from '@shared/services';
//Models
import { eBtnToggleType } from '@shared/models'
//Constants
const components = [AppBrandComponent, BtnNavComponent, BtnToggleComponent];

@Component({
  selector: 'tap-sidenav-drawer',
  standalone: true,
  imports: [...components],
  templateUrl: './sidenav-drawer.component.html',
  styleUrl: './sidenav-drawer.component.scss'
})
export class SidenavDrawerComponent {
  sidenavService = inject(SidenavService);
  mediaQuery = inject(MediaQuery);
  toggleType = eBtnToggleType;

}
