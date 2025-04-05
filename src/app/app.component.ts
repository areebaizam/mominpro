import { Component } from '@angular/core';
import { SidenavComponent } from '@shared/components';

@Component({
    selector: 'tap-root',
    imports: [SidenavComponent],
    template: `<tap-sidenav></tap-sidenav>`
})
export class AppComponent {
}
