import { Component } from "@angular/core";
//Materials
import { MatTabsModule } from "@angular/material/tabs";
//Components
import { TabFormContainer } from "@shared/containers";
//Models
import { generateTabs, TabModel, TIMINGS_TAB_DEFINITIONS, TimingsTabKey } from "@shared/models";

//Constants
//Constants
const materialModules = [MatTabsModule];
const components = [ TabFormContainer];
const { tabForms: tabFormsData, indexes: INDEXES } = generateTabs<TimingsTabKey, typeof TIMINGS_TAB_DEFINITIONS>(TIMINGS_TAB_DEFINITIONS);



@Component({
    selector: 'tap-timings',
    imports: [...materialModules, ...components],
    templateUrl: './timings.component.html',
    styleUrl: './timings.component.scss'
})
export default class TimingsComponent {
    activeTabIndex = INDEXES.IQAMAH;
    tabForms: TabModel<TimingsTabKey>[] = tabFormsData;

    submit(formValue: any) {
        console.log('TimingsComponent',formValue);
    }
}