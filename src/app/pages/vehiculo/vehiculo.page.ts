import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage {

  p:string = "";
  m:string = "";
  o:string = "";
  l:string = "";
  

  constructor(private router: Router, private activedRouter: ActivatedRoute, private toastCtrl: ToastController, public navCtrl:NavController, private alertController: AlertController) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){

        this.p = this.router.getCurrentNavigation().extras.state.pat;
        this.m = this.router.getCurrentNavigation().extras.state.mar;
        this.o = this.router.getCurrentNavigation().extras.state.mod;
        this.l = this.router.getCurrentNavigation().extras.state.col;
      }
    })
   }

   modificarDatos() {
    let navigationExtras: NavigationExtras = {
      state: {
        pate: this.p,
        marc: this.m,
        model: this.o,
        colo: this.l
      }
    }
    this.router.navigate(['/modi-vehiculo'], navigationExtras);
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Vehiculo eliminado con exito.',
      duration: 2000
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Estas seguro de que quieres eliminar el vehiculo?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.presentToast()
            this.navCtrl.navigateRoot('/menu-p');
          }
        },
      ],
    });
  
    await alert.present();
  }
  
  }
  
  


