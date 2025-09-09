import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorDialogService: MatSnackBar, private zone: NgZone) {}

  handleError(error: any) {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection;
    }

    let message = 'Ocorreu um erro inesperado.';

    if (error.error?.errors) {
      const errors = error.error.errors;
      message = Object.values(errors).flat().join('\n');
    }

    this.zone.run(() =>
      this.errorDialogService.open(message, 'Fechar', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      })
    );

    console.error('Error from global error handler', error);
  }
}
