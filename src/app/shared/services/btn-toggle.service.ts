import { computed, inject, Injectable, signal } from '@angular/core';
//Services
import { SidenavService } from '@shared/services';
//Models
import { APP_TOGGLE_ICONS, BtnToggleModel, eBtnToggleType } from '@shared/models';


@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  sidenavService = inject(SidenavService)
  readonly APP_TOGGLE_ICONS:BtnToggleModel[] = APP_TOGGLE_ICONS;
  #appToggleBtnData = signal<BtnToggleModel[]>(APP_TOGGLE_ICONS);
  appToggleBtnData = computed(this.#appToggleBtnData);

  handleToggleEvent(type: eBtnToggleType, state: boolean): void {
    this.updateState(type, state);
    switch (type) {
      case eBtnToggleType.SIDENAV:
        this.sidenavService.toggleState();
        break;

    }
  }

  private updateState(type: eBtnToggleType, state: boolean) {
    this.#appToggleBtnData.update((icons) =>
      icons.map((btnData) =>
        btnData.type === type ? { ...btnData, isActive: state } : btnData
      )
    );
  }
}
