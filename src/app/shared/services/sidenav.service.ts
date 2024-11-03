import { computed, Injectable, signal } from '@angular/core';
//Models

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  #isOpen = signal<boolean>(false);
  isOpen = computed<boolean>(this.#isOpen);

  toggleState() {
    this.setState(!this.#isOpen());
  }

  private setState(state: boolean) {
    this.#isOpen.set(state)
  }

}
