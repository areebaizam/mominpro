import { Component, computed, DestroyRef, effect, inject, QueryList, signal, ViewChildren, } from "@angular/core";
//Materials
import { MatTabsModule } from "@angular/material/tabs";
//Components
import { BaseFormComponent } from "@shared/components";
//Utilities
import { getResult } from "@core/utilities";
//Models
import { SETTINGS_TAB_DEFINITIONS, SettingsTabKey, generateTabs } from "@shared/models";
//Constants
const materialModules = [MatTabsModule];
const components = [BaseFormComponent];
const { tabs: tabData, indexes: INDEXES } = generateTabs<SettingsTabKey, typeof SETTINGS_TAB_DEFINITIONS>(SETTINGS_TAB_DEFINITIONS);

@Component({
    selector: "tap-settings",
    imports: [...materialModules, ...components],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
})
export default class SettingsComponent {
    @ViewChildren('baseTab') baseTabs!: QueryList<BaseFormComponent>;

    destroyRef = inject(DestroyRef);

    activeTabIndex = signal<number>(INDEXES.SALAH);
    tabs = tabData;

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

    getTabTemplate(index: number): BaseFormComponent | null {
        return this.baseTabs?.get(index) ?? null;
    }

    submit(formValue: any) {
        console.log("Form Value", formValue);
        // if (this.activeTabIndex() == INDEXES.SALAH) {
        //   this.addUpdateOrganisation(formValue);
        // }
    }
}
