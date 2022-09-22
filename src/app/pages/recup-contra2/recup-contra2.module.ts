import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecupContra2PageRoutingModule } from './recup-contra2-routing.module';

import { RecupContra2Page } from './recup-contra2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecupContra2PageRoutingModule
  ],
  declarations: [RecupContra2Page]
})
export class RecupContra2PageModule {}
