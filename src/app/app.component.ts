import { Component } from '@angular/core';
import { SidenavComponent } from '@shared/pages';

@Component({
  selector: 'tap-root',
  standalone: true,
  imports: [SidenavComponent],
  template: `<tap-sidenav></tap-sidenav>`
})
export class AppComponent {
}
