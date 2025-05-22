import { Component } from "@angular/core";
//Materials
import { MatTabsModule } from "@angular/material/tabs";
//Components
import { TabFormContainer } from "@shared/containers";
//Utilities
//Models
import { generateTabs, SETTINGS_TAB_DEFINITIONS, SettingsTabKey, TabModel } from "@shared/models";
//Constants
const materialModules = [MatTabsModule];
const components = [TabFormContainer];
const { tabForms: tabFormsData, indexes: INDEXES } = generateTabs<SettingsTabKey, typeof SETTINGS_TAB_DEFINITIONS>(SETTINGS_TAB_DEFINITIONS);

@Component({
    selector: "tap-settings",
    imports: [...materialModules, ...components],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
})
export default class SettingsComponent {
    activeTabIndex = INDEXES.SALAH;
    tabForms: TabModel<SettingsTabKey>[] = tabFormsData;

    submit(formValue: any) {
        console.log('SettingsComponent', formValue);
    }

}
