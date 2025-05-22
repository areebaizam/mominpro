import { Component, computed, DestroyRef, effect, inject, signal, ViewChild } from "@angular/core";
//Materials
import { MatTabsModule } from "@angular/material/tabs";
//Components
import { BaseFormComponent } from "@shared/components";
//Utilities
//Models
import { generateTabs, SETTINGS_TAB_DEFINITIONS, SettingsTabKey, TabModel } from "@shared/models";
//Constants
const materialModules = [MatTabsModule];
const components = [BaseFormComponent];
const { tabForms: tabData, indexes: INDEXES } = generateTabs<SettingsTabKey, typeof SETTINGS_TAB_DEFINITIONS>(SETTINGS_TAB_DEFINITIONS);

@Component({
    selector: "tap-settings",
    imports: [...materialModules, ...components],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
})
export default class SettingsComponent {
    //Child Components
    @ViewChild('baseForm') baseForm!: BaseFormComponent;
    //Dependency Injections
    destroyRef = inject(DestroyRef);
    // Variables
    activeTabIndex = signal<number>(INDEXES.SALAH);
    tabs: TabModel<SettingsTabKey>[] = tabData;

    constructor() {
        effect(() => {
            //   if (this.activeTabIndex() === INDEXES.MOSQUE && this.authService.hasOrganisation()) {
            //     this.fetchOrgData();
            //   }
        });
    }

    currentTabForms = computed(() => {
        return this.tabs[this.activeTabIndex()].forms ?? [];
    });


    submit(formValue: any) {
        console.log("Form Value", formValue);
        // if (this.activeTabIndex() == INDEXES.SALAH) {
        //   this.addUpdateOrganisation(formValue);
        // }
    }
}
