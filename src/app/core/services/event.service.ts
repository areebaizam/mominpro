import { inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
//RXJS
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';

@Injectable({
  providedIn: 'root'
})
export class EventService implements OnDestroy {

  #keydown$ = new Subject<KeyboardEvent>();
  #fullscreenChange$ = new Subject<Event>();
  #destroy$ = new Subject<void>();
  document = inject(DOCUMENT);

  constructor() {
    // Listen to keydown events at the document level
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(takeUntil(this.#destroy$),
        filter((event) => ['F11', 'Escape', 'f', 'F', 'd', 'D'].includes(event.key)))
      .subscribe((event) => this.handleKeyEvent(event));

    // // Listen to fullscreenchange events at the document level
    fromEvent(this.document, 'fullscreenchange')
      .pipe(takeUntil(this.#destroy$))
      .subscribe((event) => this.#fullscreenChange$.next(event));
  }

  // Observable for fullscreenchange events
  get fullscreenChange$(): Observable<Event> {
    return this.#fullscreenChange$.asObservable();
  }

  // Expose as an observable to other components/services
  get keydown$(): Observable<KeyboardEvent> {
    return this.#keydown$.asObservable();
  }

  private handleKeyEvent($event: KeyboardEvent) {
    $event.stopImmediatePropagation();
    if ($event.key === 'F11' && !this.isFullScreen) {
      $event.preventDefault();
      this.toggleFullScreen();
    }
    else if ($event.key === 'Escape' && this.isFullScreen) {
      $event.preventDefault();
      this.toggleFullScreen();
    }

    //Bypass Shortcut checks
    if (this.isActiveElementEditable()) return;

    if ($event.key === 'F' || $event.key === 'f') {
      this.toggleFullScreen();
    }
    else this.#keydown$.next($event);
  }

  toggleFullScreen() {
    if (!this.isFullScreen) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  get isFullScreen() {
    return !!document.fullscreenElement;
  }

  isActiveElementEditable(): boolean {
    const activeElement = this.document.activeElement as HTMLElement;
    return activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.isContentEditable;
  }

  ngOnDestroy() {
    // Clean up to prevent memory leaks
    this.#destroy$.next();
    this.#destroy$.complete();
  }
}
