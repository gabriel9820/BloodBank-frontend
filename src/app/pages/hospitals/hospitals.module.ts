import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HospitalsRoutingModule } from './hospitals-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HospitalListComponent } from './components/hospital-list/hospital-list.component';
import { HospitalFormComponent } from './components/hospital-form/hospital-form.component';

@NgModule({
  declarations: [HospitalListComponent, HospitalFormComponent],
  imports: [
    CommonModule,
    HospitalsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
})
export class HospitalsModule {}
