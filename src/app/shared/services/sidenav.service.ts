import { computed, Injectable, signal } from '@angular/core';
//Models
import { BtnToggleModel, SIDENAV_TOGGLE_ICON } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  
  #isOpen = computed<boolean>(() => this.#menuBtnData().isActive);
  #menuBtnData = signal<BtnToggleModel>(SIDENAV_TOGGLE_ICON);

  isOpen = computed<boolean>(this.#isOpen);
  menuBtnData = computed(this.#menuBtnData);

  toggleState() {
    this.setState(!this.#menuBtnData().isActive)
  }

  closedStart() {
    this.setState(false);
  }

  private setState(state: boolean) {
    this.#menuBtnData.update((data) => { return { ...data, isActive: state }; });
  }

}
