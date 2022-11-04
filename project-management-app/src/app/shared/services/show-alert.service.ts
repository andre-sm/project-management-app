import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AlertComponent } from '../components/alert-component/alert-component.component';

@Injectable({providedIn: 'root'})
export class ShowAlertService {
  position = { horizontal: 'right', vertical: 'top' }
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  showAlert(message: string) {
    this._snackBar.openFromComponent(AlertComponent, {
      data: message,
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.position.horizontal as MatSnackBarHorizontalPosition,
      verticalPosition: this.position.vertical as MatSnackBarVerticalPosition
    });
  }
}
