import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
//Model
import { BtnNavModel } from '@shared/models';

const materialModules = [MatButtonModule, MatIconModule]
@Component({
    selector: 'tap-btn-nav',
    imports: [RouterLinkActive, RouterLink, ...materialModules],
    templateUrl: './btn-nav.component.html',
    styleUrl: './btn-nav.component.scss'
})
export class BtnNavComponent {
  data = input.required<BtnNavModel>()
}
