import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  e:string = "vicente@gmail.com";
  c:string = "Vicente123";
  n:string = "Vicente";
  a:string = "Echeverria";
  nu:string= "12345678";

  pepe:string = "cacaseca";

  constructor(private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, public navCtrl:NavController) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        /*this.pepe = this.router.getCurrentNavigation().extras.state.pe;*/
        this.e = this.router.getCurrentNavigation().extras.state.correo;
        this.c = this.router.getCurrentNavigation().extras.state.contra;
        this.n = this.router.getCurrentNavigation().extras.state.nom;
        this.a = this.router.getCurrentNavigation().extras.state.ape;

      }
    })
   }

  modificarDatos2(){
    let navigationExtras: NavigationExtras = {
      state: {
        nom: this.n,
        em: this.e,
        con: this.c,
        ape: this.a,
        num :this.nu,
      }
  }
  this.router.navigate(['/modi-cuenta'], navigationExtras);
}


async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Estas seguro de que quieres cerrar sesion?',
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
          this.navCtrl.navigateRoot('/login');
        }
      },
    ],
  });

  await alert.present();
}


  /*modificarDatos2(){
    let navigationExtras: NavigationExtras = {
      state: {
        em: this.e,
        con: this.c,
        nom: this.n,
        ape: this.a
      }
  }
  this.router.navigate(['/modi-cuenta'], navigationExtras);
}
*/
}
