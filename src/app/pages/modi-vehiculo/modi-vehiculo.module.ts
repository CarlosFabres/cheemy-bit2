import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModiVehiculoPageRoutingModule } from './modi-vehiculo-routing.module';

import { ModiVehiculoPage } from './modi-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModiVehiculoPageRoutingModule
  ],
  declarations: [ModiVehiculoPage]
})
export class ModiVehiculoPageModule {}
