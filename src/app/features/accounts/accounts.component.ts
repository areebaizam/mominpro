import { AfterViewInit, Component, ComponentRef, OnDestroy, signal, ViewChild, ViewContainerRef } from "@angular/core";
//RXJS
import { Subscription } from "rxjs/internal/Subscription";
//Materials
import { MatTabsModule } from "@angular/material/tabs";
//Components
import { ActionButtonsCESComponent } from "@shared/components";
import { BaseFormComponent } from "@shared/pages";
// Models
import { eBtnActionCESType, ACCOUNTS_TABS_DATA, TabModel, AccountConstants } from "@shared/models";


const materialModules = [MatTabsModule];
const components = [ActionButtonsCESComponent];

@Component({
    selector: 'tap-accounts',
    imports: [...materialModules, ...components],
    templateUrl: './accounts.component.html',
    styleUrl: './accounts.component.scss'
})
export default class AccountsComponent implements AfterViewInit, OnDestroy {

    @ViewChild('formContainer', { read: ViewContainerRef }) formContainer!: ViewContainerRef;
    private componentRef!: ComponentRef<BaseFormComponent>;
    private subscriptions: Subscription = new Subscription();

    tabs = signal<TabModel[]>(ACCOUNTS_TABS_DATA);

    // Active tab tracking
    activeTabId = signal(AccountConstants.MOSQUE);

    async ngAfterViewInit() {
        this.onTabChange(0);
    }

    async onTabChange(index: number): Promise<void> {
        this.activeTabId.set(ACCOUNTS_TABS_DATA[index]?.id);

        // Clear the container before loading a new component
        if (this.formContainer) {
            this.formContainer.clear();
        }

        this.componentRef = this.formContainer.createComponent(BaseFormComponent);
        const tab = this.currentTab();
        if (tab) {
            this.componentRef.instance.editMode = tab.editMode;
            this.componentRef.instance.forms = tab.forms;
        }
        this.subscriptions.add(this.componentRef.instance.toggleEditMode.subscribe((toggle) => {
            this.toggleEditMode(toggle);
        }));

    }

    currentTab() {
        return this.tabs().find((tab) => tab.id === this.activeTabId());
    }

    destroyComponent() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

    toggleEditMode(edit: boolean) {
        const tabs = this.tabs();
        const tabIndex = tabs.findIndex((tab) => tab.id === this.activeTabId());
        if (tabIndex !== -1) {
            tabs[tabIndex].editMode = edit;
            this.tabs.set(tabs);
        }
    }

    onActionBtnClicked(action: eBtnActionCESType) {
        this.componentRef.instance.actionButtonClicked(action);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        this.destroyComponent();
    }
}