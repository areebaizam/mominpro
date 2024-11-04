import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'tap-bar-hidden',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './bar-hidden.component.html',
  styleUrl: './bar-hidden.component.scss'
})
export class BarHiddenComponent {

}
