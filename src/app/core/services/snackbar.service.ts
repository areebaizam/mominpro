import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarMessageComponent } from '@core/components';
import { SnackbarData, SnackBarType } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackBar = inject(MatSnackBar);
  private _msDefaultDuration = 9500;
  private _msDefaultDelay = 3500;

  private show(type: SnackBarType, message: string, msDuration?: number, msDelay?: number) {
    msDuration = msDuration ?? this._msDefaultDuration;
    msDelay = msDelay ?? this._msDefaultDelay;

    this._snackBar.openFromComponent(SnackbarMessageComponent, {
      data: { type, message, msDuration, msDelay } as SnackbarData,
      duration: msDuration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [type],
    });
  }

  success(message: string, duration?: number) {
    this.show('success', message, duration);
  }

  error(message: string, duration?: number) {
    this.show('error', message, duration);
  }

  warning(message: string, duration?: number) {
    this.show('warning', message, duration);
  }
}
