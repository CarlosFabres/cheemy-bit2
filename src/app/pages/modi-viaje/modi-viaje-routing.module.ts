import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModiViajePage } from './modi-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: ModiViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModiViajePageRoutingModule {}
