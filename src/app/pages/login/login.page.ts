import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  e: string = "";
  c: string = "";
  n: string = "";
  a: string = "";

  e2: string = "vicente@gmail.com";
  c2: string = "Vicente123";
  n2: string = "Vicente";
  a2: string = "Echeverria";

  e3: string = "carlos@gmail.com";
  c3: string = "Carlos123";
  n3: string = "Carlos";
  a3: string = "Fabres";


  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController) {
    this.activedRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.e = this.router.getCurrentNavigation().extras.state.correo;
        this.c = this.router.getCurrentNavigation().extras.state.contra;
        this.n = this.router.getCurrentNavigation().extras.state.nom;
        this.a = this.router.getCurrentNavigation().extras.state.ape;
      }
    })
  }

  email: string = "";
  clave: string = "";


  validar() {
    let lista1: string[] = ["vicente@gmail.com", "carlos@gmail.com", this.e];
    let lista2: string[] = ["Vicente123", "Carlos123", this.c];

    if ((this.email.length < 1) || (this.clave.length < 1)) {
      this.presentAlert4();
    }
    else if ((this.email != lista1[0] || this.clave != lista2[0]) && (this.email != lista1[1] || this.clave != lista2[1]) && (this.email != lista1[2] || this.clave != lista2[2])) {
      this.presentAlert();
    }
    else {
      this.pasarDatos();
    }
  }



  pasarDatos() {
    if ((this.email == "vicente@gmail.com")) {
      let navigationExtras: NavigationExtras = {
        state: {
          correo: this.e2,
          contra: this.c2,
          nom: this.n2,
          ape: this.a2,
          eli: '0'
        }
      }
      this.router.navigate(['/menu-p'], navigationExtras);
    
    }
    else if (((this.email == "carlos@gmail.com"))){
      let navigationExtras: NavigationExtras = {
        state: {
          correo: this.e3,
          contra: this.c3,
          nom: this.n3,
          ape: this.a3,
          eli: '0'
        }
      }
      this.router.navigate(['/menu-p'], navigationExtras);
    }
    else {
      let navigationExtras: NavigationExtras = {
        state: {
          correo: this.e,
          contra: this.c,
          nom: this.n,
          ape: this.a
        }
      }
      this.router.navigate(['/menu-p'], navigationExtras);
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'mal',
      duration: 2000
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Datos inválidos',
      message: 'Correo o contraseña incorrectas',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  ionViewWillEnter() {

    this.menuCtrl.enable(false)
  }

  async presentAlert4() {
    const alert = await this.alertController.create({
      header: 'Campos vacios',
      message: 'Todos los campos deben estar llenos',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  ngOnInit() {

  }
  

}
