import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatoVPageRoutingModule } from './dato-v-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DatoVPage } from './dato-v.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatoVPageRoutingModule,
    MatTooltipModule
  ],
  declarations: [DatoVPage]
})
export class DatoVPageModule {}
