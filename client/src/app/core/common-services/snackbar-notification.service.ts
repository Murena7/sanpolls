import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarNotificationService {
  constructor(private snackBar: MatSnackBar) {}

  successfully(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'successfully-notification',
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 12000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'error-notification',
    });
  }
}
