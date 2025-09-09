import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private defaultConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 5000,
  };

  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      panelClass: ['snackbar-success'],
    });
  }

  error(message: string) {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,      
      panelClass: ['snackbar-error'],
    });
  }

  info(message: string) {
    this.snackBar.open(message, 'Fechar', {
      ...this.defaultConfig,
      panelClass: ['snackbar-info'],
    });
  }
}
