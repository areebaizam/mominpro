import { Component } from '@angular/core';
import { SidenavComponent } from '@shared/pages';

@Component({
    selector: 'tap-root',
    imports: [SidenavComponent],
    template: `<tap-sidenav></tap-sidenav>`
})
export class AppComponent {
}
