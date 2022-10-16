import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeempPageRoutingModule } from './viajeemp-routing.module';

import { ViajeempPage } from './viajeemp.page';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeempPageRoutingModule
  ], providers:
    [
      Geolocation
    ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ViajeempPage]
})
export class ViajeempPageModule { }


