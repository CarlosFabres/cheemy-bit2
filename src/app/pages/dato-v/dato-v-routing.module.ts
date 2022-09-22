import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatoVPage } from './dato-v.page';

const routes: Routes = [
  {
    path: '',
    component: DatoVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatoVPageRoutingModule {}
