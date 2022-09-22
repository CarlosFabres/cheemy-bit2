import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PerfilPage } from './perfil.page';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
