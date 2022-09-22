import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dato-v',
  templateUrl: './dato-v.page.html',
  styleUrls: ['./dato-v.page.scss'],
})
export class DatoVPage implements OnInit {

  e: string = "";
  c: string = "";
  n: string = "";
  a: string = "";

  eliminar: string= "";

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

    console.log(this.eliminar);
  }

  

  eliminarViaje() {
    this.eliminar="hola";
    let navigationExtras: NavigationExtras = {
      state: {
        eli: '1',
        correo: this.e,
        contra: this.c,
        nom: this.n,
        ape: this.a
      }
    }
    this.presentToast();
    this.router.navigate(['/menu-p'], navigationExtras);
  
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Viaje agendado con exito.',
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
