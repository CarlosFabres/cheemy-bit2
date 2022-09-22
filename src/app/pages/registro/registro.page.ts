import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  nombre: string = "";
  apellido: string = "";
  email: string = "";
  numero: string = "";
  clave: string = "";
  clave2: string = "";

  constructor(private router: Router, private alertController: AlertController, private toastCtrl: ToastController) { }


  

  pasarDatos(){
    var correo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/


    if((this.nombre == "") || (this.apellido == "") || (this.email == "") || (this.clave == "") || (this.clave2 == "")){
      this.presentAlert4();
    }

    else if(!correo.test(this.email)){
      this.presentAlert5();
    }

    else if(/[A-Z]/.test(this.numero) || /[a-z]/.test(this.numero)){
      this.presentAlert7();
    }

    else if(this.numero.length != 8) {
      this.presentAlert8();
    }

    else if(!/[A-Z]/.test(this.clave) || !/[0-9]/.test(this.clave)){
      this.presentAlert6();
    }

    else if(this.clave.length < 8) {
      this.presentAlert2();
    }

    else if (this.clave != this.clave2) {
      this.presentAlert();
    }

    else {
      let navigationExtras: NavigationExtras = {
        state: {
          correo: this.email,
          contra: this.clave,
          contra2: this.clave2,
          nom: this.nombre,
          ape: this.apellido
        }
      }
      this.presentToast();
      this.router.navigate(['/login'], navigationExtras);
    }
  }




  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Las contraseñas no coinciden',
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

  async presentAlert6() {
    const alert = await this.alertController.create({
      header: 'Clave invalido',
      message: 'Debe tener mayuscula y numero',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert7() {
    const alert = await this.alertController.create({
      header: 'Numero invalido',
      message: 'Solo números',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert8() {
    const alert = await this.alertController.create({
      header: 'Numero invalido',
      message: '8 digitos',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Usuario registrado con exito.',
      duration: 2000
    });
    toast.present();
  }

}



