import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '@core/models';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'tap-snackbar-message',
  imports: [MatProgressBarModule, MatButtonModule],
  templateUrl: './snackbar-message.component.html',
  styleUrl: './snackbar-message.component.scss'
})
export class SnackbarMessageComponent {
  data = inject(MAT_SNACK_BAR_DATA) as SnackbarData;
  snackBarRef = inject(MatSnackBarRef<SnackbarMessageComponent>);
  progress = 120;
  intervalId: any;
  timeoutId: any;
  actionLabel:string ='';


  ngOnInit() {
    this.actionLabel = this.data.actionLabel || 'Dismiss';
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

  onClick() {
    this.snackBarRef.dismissWithAction();
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
  }
}
