import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//Material
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';

//Components
import { SidenavDrawerComponent } from './sidenav-drawer/sidenav-drawer.component';
import { BreadcrumbComponent, BarBottomComponent, BarTopComponent,BarHiddenComponent } from '@shared/components';
//Services
import { MediaQuery } from '@core/services';
import { ToggleService, SidenavService } from '@shared/services';
//Models
import { MatDrawerPosition, eBtnToggleType } from '@shared/models';

const materialModules = [MatSidenavModule];
const components = [BreadcrumbComponent, SidenavDrawerComponent,BarBottomComponent, BarTopComponent, BarHiddenComponent];

@Component({
  selector: 'tap-sidenav',
  standalone: true,
  imports: [RouterOutlet, ...materialModules, ...components],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  sidenavService = inject(SidenavService);
  mediaQuery = inject(MediaQuery);
  toggleService = inject(ToggleService);
  mode = computed<MatDrawerMode>(() => this.mediaQuery.isLarge() ? "side" : "over");
  position = computed<MatDrawerPosition>(() => this.mediaQuery.isMobile() ? "end" : "start");
  isMobile = computed<boolean>(() => this.mediaQuery.isMobile());
  isLarge = computed<boolean>(() => this.mediaQuery.isLarge());
  toggleType = eBtnToggleType.SIDENAV;
}
