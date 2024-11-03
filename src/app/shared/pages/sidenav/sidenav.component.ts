import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//Material
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
//Components
import { BarBottomComponent, BarTopComponent } from '@shared/components';
//
import { MediaQuery } from '@core/services';
import { SidenavService } from '@shared/services';
import { MatDrawerPosition } from '@shared/models';

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
  mediaQuery = inject(MediaQuery);  
  mode = computed<MatDrawerMode>(() => this.mediaQuery.isLarge() ? "side" : "over");
  position = computed<MatDrawerPosition>(() => this.mediaQuery.isMobile() ? "end" : "start");
  isMobile = computed<boolean>(() => this.mediaQuery.isMobile());
  isLarge = computed<boolean>(() => this.mediaQuery.isLarge());
}
