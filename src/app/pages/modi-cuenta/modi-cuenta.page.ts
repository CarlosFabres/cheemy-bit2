import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modi-cuenta',
  templateUrl: './modi-cuenta.page.html',
  styleUrls: ['./modi-cuenta.page.scss'],
})
export class ModiCuentaPage {

  e:string = "";
  c:string = "";
  c2:string = "";
  n:string = "";
  a:string = "";
  nu:string = "";




  constructor(private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private toastCtrl: ToastController) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.e = this.router.getCurrentNavigation().extras.state.em;
        this.c = this.router.getCurrentNavigation().extras.state.con;
        this.n = this.router.getCurrentNavigation().extras.state.nom;
        this.a = this.router.getCurrentNavigation().extras.state.ape;
        this.nu = this.router.getCurrentNavigation().extras.state.num;
      }
    })
   }

   modificarDatos3() {
    let navigationExtras: NavigationExtras = {
      state: {
        /*pe: this.ap*/
        correo: this.e,
        contra: this.c,
        nom: this.n,
        ape: this.a,
        num: this.nu
      }
    }
    this.router.navigate(['/perfil'], navigationExtras);
  
  }

  validar(){
    var correo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/


    if((this.e.length < 1 ) || (this.n.length < 1 ) || (this.a.length < 1) || (this.nu.length < 1) || (this.c.length < 1) || (this.c2.length < 1)){
      this.presentAlert4();
    }

    else if(!correo.test(this.e)){
      this.presentAlert5();
    }

    else if(/[A-Z]/.test(this.nu) || /[a-z]/.test(this.nu)){
      this.presentAlert7();
    }


    else if (this.nu.length != 8){
      this.presentAlert3();
    }

    else if(!/[A-Z]/.test(this.c) || !/[0-9]/.test(this.c)){
      this.presentAlert6();
    }

    else if (this.c.length < 8) {
      this.presentAlert2();
    }

    else if (this.c != this.c2) {
      this.presentAlert();
    }

    else {
      this.presentToast();
      this.modificarDatos3();
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
    message: 'Solo numeros pete',
    buttons: ['Aceptar'],
  });

  await alert.present();
}

async presentAlert8() {
  const alert = await this.alertController.create({
    header: 'Numero invalido',
    message: '9 digitos',
    buttons: ['Aceptar'],
  });

  await alert.present();
}

async presentToast() {
  const toast = await this.toastCtrl.create({
    message: 'Cuenta modificada con exito.',
    duration: 2000
  });
  toast.present();
}

}
