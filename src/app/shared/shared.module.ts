import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [PageHeaderComponent, ConfirmDialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [PageHeaderComponent, ConfirmDialogComponent],
})
export class SharedModule {}
