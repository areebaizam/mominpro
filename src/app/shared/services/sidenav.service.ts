import { computed, inject, Injectable, signal } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MediaService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  mediaService = inject(MediaService);
  mode = computed<MatDrawerMode>(() => this.mediaService.isLarge() ? "side" : "over");
  isMobile = computed<boolean>(() => this.mediaService.isMobile());
  isLarge = computed<boolean>(() => this.mediaService.isLarge());
  isOpen = computed<boolean>(() => this.mediaService.isLarge() || this.#isOpen());
  #isOpen = signal<boolean>(true);

  toggleSideNav() {
    this.#isOpen.update(value => !value);
  }

  closedStart() {
    this.#isOpen.set(false);
  }

}
