import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarVPageRoutingModule } from './registrar-v-routing.module';

import { RegistrarVPage } from './registrar-v.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarVPageRoutingModule
  ],
  declarations: [RegistrarVPage]
})
export class RegistrarVPageModule {}
