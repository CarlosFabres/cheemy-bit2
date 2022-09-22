import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modi-vehiculo',
  templateUrl: './modi-vehiculo.page.html',
  styleUrls: ['./modi-vehiculo.page.scss'],
})
export class ModiVehiculoPage {

  p:string = "";
  m:string = "";
  o:string = "";
  l:string = "";

  patente:string = "";
  marca:string = "";
  modelo:string = "";
  color:string = "";

  constructor(private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private toastCtrl: ToastController) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.p = this.router.getCurrentNavigation().extras.state.pate;
        this.m = this.router.getCurrentNavigation().extras.state.marc;
        this.o = this.router.getCurrentNavigation().extras.state.model;
        this.l = this.router.getCurrentNavigation().extras.state.colo;
      }
    })
   }

    modificarDatos2(){

      if ((this.patente.length < 1 ) || (this.marca.length < 1 ) || (this.marca.length < 1 ) || (this.color.length < 1 )) {
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
        message: 'Vehiculo modificado con exito.',
        duration: 2000
      });
      toast.present();
    }
}



