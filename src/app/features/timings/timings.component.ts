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
const { tabs: tabData, indexes: INDEXES } = generateTabs<TimingsTabKey, typeof TIMINGS_TAB_DEFINITIONS>(TIMINGS_TAB_DEFINITIONS);


@Component({
    selector: 'tap-timings',
    imports: [...materialModules, ],
    templateUrl: './timings.component.html',
    styleUrl: './timings.component.scss'
})
export default class TimingsComponent {

    @ViewChild('formContainer', { read: ViewContainerRef, static: true })
    container!: ViewContainerRef;


    ngAfterViewInit() {
        this.container.clear(); // optional: clears any previously inserted components
        const componentRef: ComponentRef<BaseFormComponent> =
            this.container.createComponent(BaseFormComponent);
        // componentRef.instance.forms = this.currentTabForms();
    }

    @ViewChildren('baseTab') baseTabs!: QueryList<BaseFormComponent>;

    destroyRef = inject(DestroyRef);

    activeTabIndex = signal<number>(INDEXES.PREFERENCE);
    tabs = tabData;

    constructor() {
        effect(() => {
            // console.log("Active Tab Index", this.activeTabIndex());
            this.container.clear(); // optional: clears any previously inserted components
            const componentRef: ComponentRef<BaseFormComponent> =
                this.container.createComponent(BaseFormComponent);
            // componentRef.instance.forms = this.currentTabForms();
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