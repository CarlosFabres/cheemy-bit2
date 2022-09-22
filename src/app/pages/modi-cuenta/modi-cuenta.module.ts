import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModiCuentaPageRoutingModule } from './modi-cuenta-routing.module';

import { ModiCuentaPage } from './modi-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModiCuentaPageRoutingModule
  ],
  declarations: [ModiCuentaPage]
})
export class ModiCuentaPageModule {}
