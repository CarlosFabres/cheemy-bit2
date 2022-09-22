import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-empviaje',
  templateUrl: './empviaje.page.html',
  styleUrls: ['./empviaje.page.scss'],
})
export class EmpviajePage implements OnInit {

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private toastCtrl: ToastController) { }

  elim: string = "0";

  eliminarViaje() {
    let navigationExtras: NavigationExtras = {
      state: {
        eli: this.elim,
      }
    }
    this.router.navigate(['/menu-p'], navigationExtras);
  
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Estas seguro?',
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
            this.eliminarViaje()
          }
        },
      ],
    });
  
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Viaje eliminado con exito.',
      duration: 2000
    });
    toast.present();
  }


  ngOnInit() {
  }

}
