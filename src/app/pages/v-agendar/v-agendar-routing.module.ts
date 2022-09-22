import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VAgendarPage } from './v-agendar.page';

const routes: Routes = [
  {
    path: '',
    component: VAgendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VAgendarPageRoutingModule {}
