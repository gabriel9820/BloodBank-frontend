import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HospitalListComponent } from './components/hospital-list/hospital-list.component';
import { HospitalFormComponent } from './components/hospital-form/hospital-form.component';

const routes: Routes = [
  {
    path: '',
    component: HospitalListComponent,
  },
  {
    path: 'create',
    component: HospitalFormComponent,
  },
  {
    path: 'edit/:id',
    component: HospitalFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalsRoutingModule {}
