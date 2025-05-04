import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '@core/models';

@Component({
  selector: 'tap-snackbar-message',
  imports: [MatProgressBarModule],
  templateUrl: './snackbar-message.component.html',
  styleUrl: './snackbar-message.component.scss'
})
export class SnackbarMessageComponent {
  data = inject(MAT_SNACK_BAR_DATA) as SnackbarData;
  snackBarRef = inject(MatSnackBarRef<SnackbarMessageComponent>);
  progress = 150;
  intervalId: any;
  timeoutId: any;


  ngOnInit() {
    console.log("SnackbarMessageComponent data", this.data)
    const stepsInterval = (this.data.msDuration - this.data.msDelay) / this.progress;
    this.timeoutId = setTimeout(() => {
      this.intervalId = setInterval(() => {
        this.progress--;
        if (this.progress < 0) {
          clearInterval(this.intervalId);
          clearTimeout(this.timeoutId);
        }
      }, stepsInterval);
    }, this.data.msDelay - 500);
  }
}
