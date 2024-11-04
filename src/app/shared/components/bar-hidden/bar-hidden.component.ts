import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'tap-bar-hidden',
  standalone: true,
  imports: [MatToolbarModule],
  template: '<mat-toolbar></mat-toolbar>',
  styleUrl: './bar-hidden.component.scss'
})
export class BarHiddenComponent {

}
