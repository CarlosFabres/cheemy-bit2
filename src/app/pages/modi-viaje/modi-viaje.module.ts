import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModiViajePageRoutingModule } from './modi-viaje-routing.module';

import { ModiViajePage } from './modi-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModiViajePageRoutingModule
  ],
  declarations: [ModiViajePage]
})
export class ModiViajePageModule {}
