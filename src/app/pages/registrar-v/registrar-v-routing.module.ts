import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarVPage } from './registrar-v.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarVPageRoutingModule {}
