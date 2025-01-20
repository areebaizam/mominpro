import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  document = inject(DOCUMENT);
  #darkThemeMediaQuery: MediaQueryList | undefined;
  platformId = inject(PLATFORM_ID);
  darkMode = signal<boolean>(false);

  constructor() {
    this.setThemeParams();
  }
  setThemeParams() {
    if (isPlatformBrowser(this.platformId)) {
      //Todo handle icon base on sys preference
      this.#darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.updateDefaultTheme();
      // Listen for changes in system preference
      this.#darkThemeMediaQuery.addEventListener('change', () => {
        this.updateDefaultTheme();
      }, { passive: true });
    }
  }

  updateDefaultTheme() {
    const darkDefault = this.#darkThemeMediaQuery && this.#darkThemeMediaQuery.matches ? true : false;
    this.updateTheme(darkDefault);
  }

  updateTheme(state: boolean) {
    this.darkMode.set(state);
    this.document.documentElement.classList.toggle('dark-theme', state);
  }
}
