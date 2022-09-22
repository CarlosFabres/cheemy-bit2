import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajeempPage } from './viajeemp.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeempPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajeempPageRoutingModule {}
