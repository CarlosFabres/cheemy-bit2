import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CviajesPage } from './cviajes.page';

const routes: Routes = [
  {
    path: '',
    component: CviajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CviajesPageRoutingModule {}
