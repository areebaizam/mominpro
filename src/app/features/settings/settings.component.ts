import { Component } from '@angular/core';
//Materials
import { MatTabsModule } from '@angular/material/tabs';
//Componenents
import { MosqueComponent } from '@features/settings/components'

const materialModules = [MatTabsModule];
const components = [MosqueComponent]
@Component({
  selector: 'tap-settings',
  standalone: true,
  imports: [...materialModules, ...components],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export default class SettingsComponent {

}
