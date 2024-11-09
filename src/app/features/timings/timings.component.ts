import { Component } from '@angular/core';
//Materials
import { MatTabsModule } from '@angular/material/tabs';
//Componenents
import { AthanComponent, IqamaComponent, SalahComponent } from '@features/timings/components'

const materialModules = [MatTabsModule];
const components = [AthanComponent, IqamaComponent, SalahComponent]
@Component({
  selector: 'tap-timings',
  standalone: true,
  imports: [...materialModules,...components],
  templateUrl: './timings.component.html',
  styleUrl: './timings.component.scss'
})
export default class TimingsComponent {

}
