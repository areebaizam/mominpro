import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
//Components
//NOTE Do Not import from @shared alias
import { BtnToggleComponent } from '../btn-toggle/btn-toggle.component';
import { BtnNavColComponent } from '../btn-nav-col/btn-nav-col.component';
//Services
import { SidenavService } from '@shared/services';
//Models
import { eBtnToggleType } from '@shared/models'



const components = [BtnToggleComponent, BtnNavColComponent];
const materialModules = [MatToolbarModule,MatTabsModule];

@Component({
  selector: 'tap-bar-bottom',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ,...materialModules, ...components],
  templateUrl: './bar-bottom.component.html',
  styleUrl: './bar-bottom.component.scss'
})
export class BarBottomComponent {
  sidenavService = inject(SidenavService);
  toggleType = eBtnToggleType.SIDENAV;
}
