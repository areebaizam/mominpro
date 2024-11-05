import { computed, Injectable, signal } from '@angular/core';
import { APP_NAV_BTNS, BtnNavModel } from '@shared/models';
//Models

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  #isOpen = signal<boolean>(false);
  isOpen = computed<boolean>(this.#isOpen);

  navData: BtnNavModel[] = APP_NAV_BTNS;

  toggleState() {
    this.setState(!this.#isOpen());
  }

  private setState(state: boolean) {
    this.#isOpen.set(state)
  }

}
