import { Component, OnInit } from '@angular/core';

import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-recup-contra',
  templateUrl: './recup-contra.page.html',
  styleUrls: ['./recup-contra.page.scss'],
})
export class RecupContraPage {


  
  email: string = "";
  

  ionViewWillEnter() {

    this.menuCtrl.enable( false )
}


  constructor(private router: Router, private alertController: AlertController,private menuCtrl: MenuController) { }


  

  pasarDatos(){
    var correo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

    if (this.email.length < 1) {
      this.presentAlert4();
    }

    else if(!correo.test(this.email)){
      this.presentAlert5();
    }

    else {
      let navigationExtras: NavigationExtras = {
        state: {

        }
      }
      this.presentAlert();
      this.router.navigate(['/recup-contra2'], navigationExtras);
    }
  }




  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Email',
      message: 'Te enviamos un email, revisalo para recuperar su contraseña',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Contraseña',
      message: 'La contraseña es demasiado corta',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'Número invalido',
      message: 'Debe contener 9 números',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  
  async presentAlert4() {
    const alert = await this.alertController.create({
      header: 'Campos vacios',
      message: 'Todos los campos deben estar llenos',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert5() {
    const alert = await this.alertController.create({
      header: 'Correo invalido',
      message: 'Formato incorrecto',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

}
