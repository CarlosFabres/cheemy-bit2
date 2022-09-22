import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VAgendarPageRoutingModule } from './v-agendar-routing.module';

import { VAgendarPage } from './v-agendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VAgendarPageRoutingModule
  ],
  declarations: [VAgendarPage]
})
export class VAgendarPageModule {}
