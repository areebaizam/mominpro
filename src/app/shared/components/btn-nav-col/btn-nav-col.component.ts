import { Component, input } from '@angular/core';
//Material
import { MatIconModule } from '@angular/material/icon';
//Models
import { BtnNavModel } from '@shared/models';
//Constants

const materialModules = [MatIconModule];
@Component({
    selector: 'tap-btn-nav-col',
    imports: [...materialModules],
    templateUrl: './btn-nav-col.component.html',
    styleUrl: './btn-nav-col.component.scss'
})
export class BtnNavColComponent {
  data = input.required<BtnNavModel>()
}
