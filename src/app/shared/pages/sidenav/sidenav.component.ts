import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
//Components
import { BarBottomComponent, BarTopComponent } from '@shared/components';
//Services
import { SidenavService } from '@shared/services';



const materialModules = [MatSidenavModule, MatToolbarModule];
const components = [BarBottomComponent, BarTopComponent];
@Component({
  selector: 'tap-sidenav',
  standalone: true,
  imports: [RouterOutlet, ...materialModules, ...components],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  sidenavService = inject(SidenavService);
}
