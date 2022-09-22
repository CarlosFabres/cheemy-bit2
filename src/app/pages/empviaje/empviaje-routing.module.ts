import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpviajePage } from './empviaje.page';

const routes: Routes = [
  {
    path: '',
    component: EmpviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpviajePageRoutingModule {}
