import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecupContra2Page } from './recup-contra2.page';

const routes: Routes = [
  {
    path: '',
    component: RecupContra2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecupContra2PageRoutingModule {}
