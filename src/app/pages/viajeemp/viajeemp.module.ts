import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeempPageRoutingModule } from './viajeemp-routing.module';

import { ViajeempPage } from './viajeemp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeempPageRoutingModule
  ],
  declarations: [ViajeempPage]
})
export class ViajeempPageModule {}
