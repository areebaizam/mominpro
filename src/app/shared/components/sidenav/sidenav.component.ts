import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//Material
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';

//Components
import { SidenavDrawerComponent } from './sidenav-drawer/sidenav-drawer.component';
import { BreadcrumbComponent, BarBottomComponent, BarTopComponent, BarHiddenComponent } from '@shared/components';
import { LoadingSpinnerComponent } from '@core/components';
//Services
import { IconService, MediaQuery } from '@core/services';
import { ToggleService, SidenavService } from '@shared/services';
//Models
import { MatDrawerPosition, eBtnToggleType } from '@shared/models';

const materialModules = [MatSidenavModule];
const components = [BreadcrumbComponent, SidenavDrawerComponent, BarBottomComponent, BarTopComponent, BarHiddenComponent, LoadingSpinnerComponent];

@Component({
    selector: 'tap-sidenav',
    imports: [RouterOutlet, ...materialModules, ...components],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  mediaQuery: MediaQuery = inject(MediaQuery);
  iconService = inject(IconService);
  sidenavService = inject(SidenavService);

  toggleService = inject(ToggleService);
  mode = computed<MatDrawerMode>(() => this.mediaQuery.isLarge() ? "side" : "over");
  position = computed<MatDrawerPosition>(() => this.mediaQuery.isMobile() ? "end" : "start");
  isMobile = computed<boolean>(() => this.mediaQuery.isMobile());
  isLarge = computed<boolean>(() => this.mediaQuery.isLarge());
  toggleType = eBtnToggleType.SIDENAV;
}
