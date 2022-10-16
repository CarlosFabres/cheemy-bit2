import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpviajePageRoutingModule } from './empviaje-routing.module';

import { EmpviajePage } from './empviaje.page';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpviajePageRoutingModule
  ],providers:
  [
    Geolocation
  ],
  declarations: [EmpviajePage]
})
export class EmpviajePageModule {}
