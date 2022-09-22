import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModiCuentaPage } from './modi-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: ModiCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModiCuentaPageRoutingModule {}
