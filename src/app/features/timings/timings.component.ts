import { Component, ComponentRef, computed, DestroyRef, effect, inject, QueryList, signal, ViewChild, ViewChildren, ViewContainerRef, } from "@angular/core";
//Materials
import { MatTabsModule } from "@angular/material/tabs";
//Components
import { BaseFormComponent } from "@shared/components";
//Utilities
import { getResult } from "@core/utilities";
//Models
import { TIMINGS_TAB_DEFINITIONS, TimingsTabKey, generateTabs } from "@shared/models";
//Constants
const materialModules = [MatTabsModule];
const components = [BaseFormComponent];
const { tabs: tabData, indexes: INDEXES } = generateTabs<TimingsTabKey, typeof TIMINGS_TAB_DEFINITIONS>(TIMINGS_TAB_DEFINITIONS);


@Component({
    selector: 'tap-timings',
    imports: [...materialModules, ...components],
    templateUrl: './timings.component.html',
    styleUrl: './timings.component.scss'
})
export default class TimingsComponent {
    //Child Components
    @ViewChild('baseForm') baseForm!: BaseFormComponent;
    //Dependency Injections
    destroyRef = inject(DestroyRef);

    activeTabIndex = signal<number>(INDEXES.PREFERENCE);
    tabs = tabData;

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