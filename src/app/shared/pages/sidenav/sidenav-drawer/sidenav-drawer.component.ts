import { Component } from '@angular/core';
//Components

import { AppBrandComponent } from '@shared/components';
const components = [AppBrandComponent];

@Component({
  selector: 'tap-sidenav-drawer',
  standalone: true,
  imports: [...components],
  templateUrl: './sidenav-drawer.component.html',
  styleUrl: './sidenav-drawer.component.scss'
})
export class SidenavDrawerComponent {

}
