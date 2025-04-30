import { AfterViewInit, Component, ComponentRef, DestroyRef, inject, OnDestroy, signal, ViewChild, ViewContainerRef } from "@angular/core";
//RXJS
import { Subscription } from "rxjs/internal/Subscription";
//Materials
import { MatTabsModule } from "@angular/material/tabs";
//Components
import { ActionButtonsCESComponent, BaseFormComponent } from "@shared/components";
// Models
import { eBtnActionCESType, ACCOUNTS_TABS_DATA, TabModel, AccountConstants, OrgRequestModel } from "@shared/models";
import { OrganisationService } from "@shared/services";
import { AuthService } from "@core/services";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { getResult } from "@core/utilities";


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

    destroyRef = inject(DestroyRef);
    authService = inject(AuthService);
    orgService = inject(OrganisationService);

    tabs = signal<TabModel[]>(ACCOUNTS_TABS_DATA);

    // Active tab tracking
    activeTabId = signal(AccountConstants.MOSQUE);

    async ngAfterViewInit() {
        this.onTabChange(0);
        if (!!this.authService.getUserProfile()) {
            this.fetchOrgData();
        }
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
        this.subscriptions.add(this.componentRef.instance.canSaveForm.subscribe((canSave) => {
            if (canSave) {
                // extract ID
                const { organisationId, ...restInformation } = canSave.information;
                // Now build the payload
                const request = { ...canSave, information: restInformation };
                this.addUpdateOrganisation(organisationId, request);
            }
        }));

    }

    currentTab() {
        return this.tabs().find((tab) => tab.id === this.activeTabId());
    }

    private fetchOrgData(): void {
        this.orgService.getOrganisation()
            .pipe(
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(
                resp => {
                    //TODO Error Handling
                    const next = getResult(resp)
                    if (next) {
                        const patch: any = {
                            information: next.information,
                            coordinate: next.coordinate
                        };

                        if (next?.address) {
                            patch.address = next.address;
                        }

                        if (next?.contact) {
                            patch.contact = next.contact;
                        }
                        this.componentRef.instance.form.patchValue(patch);
                    }
                }
            );
    }

    private addUpdateOrganisation(orgId: string, req: OrgRequestModel) {
        if (orgId)
            this.subscriptions.add(
                this.orgService.updateOrganisation(orgId, req).subscribe()
            );
        else
            this.subscriptions.add(
                this.orgService.createOrganisation(req).subscribe(
                    resp => {
                        // if (resp.status.isSuccess && resp.next)
                        //TODO Error handling
                        // this.authService.organisationId = resp.next?.organisationId ?? null
                    }
                )
            );
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