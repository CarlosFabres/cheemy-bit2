import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-v-agendar',
  templateUrl: './v-agendar.page.html',
  styleUrls: ['./v-agendar.page.scss'],
})
export class VAgendarPage implements OnInit {

  e: string = "";
  c: string = "";
  n: string = "";
  a: string = "";

  eliminar: string = "";

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private toastCtrl: ToastController) { 
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.e = this.router.getCurrentNavigation().extras.state.correo;
        this.c = this.router.getCurrentNavigation().extras.state.contra;
        this.n = this.router.getCurrentNavigation().extras.state.nom;
        this.a = this.router.getCurrentNavigation().extras.state.ape;
        this.eliminar = this.router.getCurrentNavigation().extras.state.eli;
    
      }
    })
  }

  elim: string = "a";

  eliminarViaje() {
    let navigationExtras: NavigationExtras = {
      state: {
        eli: '0',
        correo: this.e,
        contra: this.c,
        nom: this.n,
        ape: this.a
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
      message: 'Viaje cancelado con exito.',
      duration: 2000
    });
    toast.present();
  }

  private isDisplayImage: boolean = false;
  // function
  displayImage() {
    this.isDisplayImage = !this.isDisplayImage;
  }
  
  ngOnInit() {
  }

}
