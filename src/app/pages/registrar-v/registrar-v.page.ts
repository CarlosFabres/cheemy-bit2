import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-v',
  templateUrl: './registrar-v.page.html',
  styleUrls: ['./registrar-v.page.scss'],
})
export class RegistrarVPage {

  patente: string = "";
  marca: string = "";
  modelo: string = "";
  color: string = "";

  constructor(private router: Router, private alertController: AlertController, private toastCtrl: ToastController) { }

  pasarDatos(){
    
    if ((this.patente.length < 1 ) || (this.marca.length < 1 ) || (this.modelo.length < 1 ) || (this.color.length < 1 )) {
      this.presentAlert4();
    }
    
    else if ((this.patente.length != 6 )) {
      this.presentAlert();
    }

    else {
      let navigationExtras: NavigationExtras = {
        state: {
          pat: this.patente,
          mar: this.marca,
          mod: this.modelo,
          col: this.color
        }
      }
      this.presentToast();
      this.router.navigate(['/vehiculo'], navigationExtras);
    }
  }

  

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Patente invalida',
      message: 'La patente no es valida',
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

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Vehiculo registrado con exito.',
      duration: 2000
    });
    toast.present();
  }



}
