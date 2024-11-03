import { inject, Injectable, signal } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { shareReplay } from "rxjs/internal/operators/shareReplay";

@Injectable({
  providedIn: "root",
})
export class MediaQuery {
  // Media
  private breakpointObserver = inject(BreakpointObserver);
  private readonly LARGE: string = '(min-width: 840px)';
  isMobile = signal<boolean>(false);
  isLarge = signal<boolean>(false);

  constructor() {
    this.getScreenSize();
  }

  //https://material.angular.io/cdk/layout/overview
  //XSmall	(max-width: 599.98px)
  private getScreenSize(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, this.LARGE])
      .pipe(
        shareReplay(1)
      )
      .subscribe((state) => {
        this.isMobile.set(state.breakpoints[Breakpoints.XSmall]);
        this.isLarge.set(state.breakpoints[this.LARGE]);
      });
  }
}
