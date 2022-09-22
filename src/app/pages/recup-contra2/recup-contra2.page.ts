import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-recup-contra2',
  templateUrl: './recup-contra2.page.html',
  styleUrls: ['./recup-contra2.page.scss'],
})
export class RecupContra2Page implements OnInit {


  constructor(private router: Router, private alertController: AlertController, private menuCtrl: MenuController, private toastCtrl: ToastController) { }

  clave:string="";
  clave2:string="";
  

  pasarDatos(){

    if ((this.clave.length < 1) || (this.clave2.length < 1)) {
      this.presentAlert4();
    }

    else if(!/[A-Z]/.test(this.clave) || !/[0-9]/.test(this.clave)){
      this.presentAlert6();
    }

    else if ((this.clave.length < 8)) {
      this.presentAlert2();
    }

    else if ((this.clave != this.clave2)) {
      this.presentAlert();
    }


    else {
      let navigationExtras: NavigationExtras = {
        state: {
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

  async presentAlert4() {
    const alert = await this.alertController.create({
      header: 'Campos vacios',
      message: 'Todos los campos deben estar llenos',
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

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Contraseña modificado con exito.',
      duration: 2000
    });
    toast.present();
  }

  ionViewWillEnter() {

    this.menuCtrl.enable( false )
}


  ngOnInit() {
  }

}
