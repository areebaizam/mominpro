import { computed, Injectable, signal } from '@angular/core';
import { APP_NAV_BTNS, APP_NAV_HOME_BTN,APP_NAV_TEST_BTN, BtnNavModel } from '@shared/models';
//Models

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  #isOpen = signal<boolean>(false);
  isOpen = computed<boolean>(this.#isOpen);

  homeData: BtnNavModel = APP_NAV_HOME_BTN;
  navData: BtnNavModel[] = APP_NAV_BTNS;
  testData: BtnNavModel = APP_NAV_TEST_BTN;
  
  toggleState() {
    this.setState(!this.#isOpen());
  }

  private setState(state: boolean) {
    this.#isOpen.set(state)
  }

}
