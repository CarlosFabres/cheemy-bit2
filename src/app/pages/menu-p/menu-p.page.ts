import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu-p',
  templateUrl: './menu-p.page.html',
  styleUrls: ['./menu-p.page.scss'],
})
export class MenuPPage {

  e: string = "";
  c: string = "";
  n: string = "";
  a: string = "";

  eliminar:string = "";

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController) {

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

  pasarDatos() {
    let navigationExtras: NavigationExtras = {
      state: {
        correo: this.e,
        contra: this.c,
        nom: this.n,
        ape: this.a,
        eli: this.eliminar
      }
    }
    this.router.navigate(['/perfil'], navigationExtras);
  
  }

  pasarDatosViaje() {
    let navigationExtras: NavigationExtras = {
      state: {
        correo: this.e,
        contra: this.c,
        nom: this.n,
        ape: this.a,
        eli: this.eliminar
      }
    }
    this.router.navigate(['/dato-v'], navigationExtras);
  
  }

  pasarDatosViaje2() {
    let navigationExtras: NavigationExtras = {
      state: {
        correo: this.e,
        contra: this.c,
        nom: this.n,
        ape: this.a,
        eli: this.eliminar
      }
    }
    this.router.navigate(['/v-agendar'], navigationExtras);
  
  }

  pasarDatosMenu() {
    let navigationExtras: NavigationExtras = {
      state: {
        correo: this.e,
        contra: this.c,
        nom: this.n,
        ape: this.a
      }
    }
    this.router.navigate(['/app'], navigationExtras);
  
  }
  ngOnInit() {
    this.menuCtrl.enable(true);
  }
}
