import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModiVehiculoPage } from './modi-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: ModiVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModiVehiculoPageRoutingModule {}
