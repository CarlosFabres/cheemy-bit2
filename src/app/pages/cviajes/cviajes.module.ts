import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CviajesPageRoutingModule } from './cviajes-routing.module';

import { CviajesPage } from './cviajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CviajesPageRoutingModule
  ],
  declarations: [CviajesPage]
})
export class CviajesPageModule {}
