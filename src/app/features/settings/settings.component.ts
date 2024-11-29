import { Component } from '@angular/core';
//Materials
import { MatTabsModule } from '@angular/material/tabs';
//Componenents
import { MosqueComponent, LocationComponent, HijriComponent } from '@features/settings/components'

const materialModules = [MatTabsModule];
const components = [MosqueComponent, LocationComponent, HijriComponent]
@Component({
    selector: 'tap-settings',
    imports: [...materialModules, ...components],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export default class SettingsComponent {

}
