import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
//Services
import { EventService, ThemeService } from '@core/services';
import { SidenavService } from '@shared/services';
//Models
import { APP_TOGGLE_ICONS, BtnToggleModel, eBtnToggleType, FeatureURLConstants } from '@shared/models';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService implements OnDestroy {
  
  router = inject(Router);
  sidenavService = inject(SidenavService);
  themeService = inject(ThemeService);
  eventService = inject(EventService);
  #subscriptions: Subscription = new Subscription();
  readonly APP_TOGGLE_ICONS: BtnToggleModel[] = APP_TOGGLE_ICONS;
  #appToggleBtnData = signal<BtnToggleModel[]>(APP_TOGGLE_ICONS);
  appToggleBtnData = computed(this.#appToggleBtnData);
  themeChanged = computed(() => this.handleToggleEvent(eBtnToggleType.THEME, this.themeService.darkMode()))


  constructor() {
    this.initEventListeners();
  }

  initEventListeners() {
    //Keydown EVent Listener
    this.#subscriptions.add(
      this.eventService.keydown$.subscribe((event) => {
        this.handleKeyEventShortcuts(event);
      }));

    //FullScreen Listener
    this.#subscriptions.add(this.eventService.fullscreenChange$.subscribe((event) => {
      this.updateState(eBtnToggleType.FULLSCREEN, !!this.eventService.isFullScreen);
    }));
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe()
  }

  handleToggleEvent(type: eBtnToggleType, state: boolean): void {
    this.updateState(type, state);
    switch (type) {
      case eBtnToggleType.SIDENAV:
        this.sidenavService.toggleState();
        break;
      case eBtnToggleType.THEME:
        this.themeService.updateTheme(state);
        break;
      case eBtnToggleType.FULLSCREEN:
        this.eventService.toggleFullScreen();
        break;
      case eBtnToggleType.HOME:
        this.router.navigateByUrl(FeatureURLConstants.HOME);
        break;

    }
  }

  private handleKeyEventShortcuts(event: KeyboardEvent) {
    
    //Theme Toggle
    if (event.key === 'D' || event.key === 'd') {
      this.handleToggleEvent(eBtnToggleType.THEME, !this.themeService.darkMode());
    }
    // $event.stopImmediatePropagation();
    // if ($event.key === 'F11' && !this.eventService.isFullScreen) {
    //   $event.preventDefault();
    //   this.eventService.toggleFullScreen();
    // }
    // else if ($event.key === 'Escape' && this.eventService.isFullScreen) {
    //   $event.preventDefault();
    //   this.eventService.toggleFullScreen();
    // }

    // //Bypass Shortcut checks
    // if (this.eventService.isActiveElementEditable()) return;

    // if ($event.key === 'F' || $event.key === 'f') {
    //   this.eventService.toggleFullScreen();
    // }
  }

  private updateState(type: eBtnToggleType, state: boolean) {
    this.#appToggleBtnData.update((icons) =>
      icons.map((btnData) =>
        btnData.type === type ? { ...btnData, isActive: state } : btnData
      )
    );
  }
}
