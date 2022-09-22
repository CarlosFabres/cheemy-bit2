import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPPage } from './menu-p.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPPageRoutingModule {}
