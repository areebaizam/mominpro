import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// import { BtnNavComponent } from '../btn-nav/btn-nav.component';
//Services
import { SidenavService } from '@shared/services';
//Contants
const materialModules = [MatToolbarModule, MatButtonModule, MatIconModule];
// const components = [];
@Component({
  selector: 'tap-app-brand',
  standalone: true,
  imports: [RouterLink, ...materialModules],
  templateUrl: './app-brand.component.html',
  styleUrl: './app-brand.component.scss'
})
export class AppBrandComponent {
  sidenavService = inject(SidenavService);

}
