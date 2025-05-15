import { Component, computed, DestroyRef, effect, inject, signal, ViewChild } from "@angular/core";
//Materials
import { MatTabsModule } from "@angular/material/tabs";
//Components
import { BaseFormComponent } from "@shared/components";
//Services
import { AuthService } from "@core/services";
import { OrganisationService } from "@shared/services";
//RXJS
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
//Utilities
import { getResult } from "@core/utilities";
//Models
import { ACCOUNTS_TAB_DEFINITIONS, AccountsTabKey, generateTabs, OrgRequestModel, TabModel } from "@shared/models";
//Constants
const materialModules = [MatTabsModule];
const components = [BaseFormComponent];
const { tabs: tabData, indexes: INDEXES } = generateTabs<AccountsTabKey, typeof ACCOUNTS_TAB_DEFINITIONS>(ACCOUNTS_TAB_DEFINITIONS);

@Component({
  selector: "tap-accounts",
  imports: [...materialModules, ...components],
  templateUrl: "./accounts.component.html",
  styleUrl: "./accounts.component.scss",
})
export default class AccountsComponent {
  //Child Components
  @ViewChild('baseForm') baseForm!: BaseFormComponent;
  //Dependency Injections
  destroyRef = inject(DestroyRef);
  authService = inject(AuthService);
  orgService = inject(OrganisationService);
  // Variables
  activeTabIndex = signal<number>(INDEXES.MOSQUE);
  tabs: TabModel<AccountsTabKey>[] = tabData;

  constructor() {
    effect(() => {
      if (this.activeTabIndex() === INDEXES.MOSQUE && this.authService.hasOrganisation()) {
        this.fetchOrgData();
      }
    });
  }

  currentTabForms = computed(() => {
    return this.tabs[this.activeTabIndex()].forms ?? [];
  });


  private fetchOrgData(): void {
    this.orgService
      .getOrganisation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resp) => {
        //TODO Error Handling
        const next = getResult(resp);
        if (next) {
          const patch: any = {
            information: next.information,
            coordinate: next.coordinate,
            address: next.address ?? null,
            contact: next.contact ?? null,
          };
          this.baseForm?.form.patchValue(patch);
          this.baseForm?.editMode.set(false);
          // //TODO CatchError
        }
      });
  }

  submit(formValue: any) {
    if (this.activeTabIndex() == INDEXES.MOSQUE) {
      this.addUpdateOrganisation(formValue);
    }
  }

  private addUpdateOrganisation(req: OrgRequestModel) {
    if (this.authService.hasOrganisation())
      this.orgService
        .updateOrganisation(req)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(
          (resp) => {

            if (resp.status.isSuccess) {
              this.baseForm?.editMode.set(false);
            }
            //TODO Error handling
          }
        );
    else
      this.orgService.createOrganisation(req)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((resp) => {
          if (resp.status.isSuccess) {
            this.baseForm?.editMode.set(false);
          }
          //TODO Error handling
        });
  }
}
