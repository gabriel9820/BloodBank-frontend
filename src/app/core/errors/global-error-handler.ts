import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';

import { MessageService } from 'src/app/shared/services/message.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private messageService: MessageService, private zone: NgZone) {}

  handleError(error: any) {
    let message = 'Ocorreu um erro inesperado.';

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        message = 'Não foi possível conectar ao servidor.';
      } else if (error.error?.errors) {
        const errors = error.error.errors;
        message = Object.values(errors).flat().join('\n');
      } else {
        message = error.error?.title || error.error || message;
      }
    }

    this.zone.run(() => this.messageService.error(message));

    console.error('GlobalErrorHandler', error);
  }
}
