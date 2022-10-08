import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';
import { CamaraService } from 'src/app/services/camara.service';

@Component({
  selector: 'app-modi-cuenta',
  templateUrl: './modi-cuenta.page.html',
  styleUrls: ['./modi-cuenta.page.scss'],
})
export class ModiCuentaPage {

  corre = localStorage.getItem("correo");

  foto: any;

  id = "";
  c = "";
  n = "";
  a = "";
  nu = "";
  cl = "";
  cl2 = "";
  img = "";




  constructor(private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private toastCtrl: ToastController, private servicioBD: BDService, private camara: CamaraService) {
    this.activedRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.activedRouter.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
            this.id = this.router.getCurrentNavigation().extras.state.idEnviado;
            this.c = this.router.getCurrentNavigation().extras.state.correoEnviado;
            this.n = this.router.getCurrentNavigation().extras.state.nombreEnviado;
            this.a = this.router.getCurrentNavigation().extras.state.apellidoEnviado;
            this.nu = this.router.getCurrentNavigation().extras.state.numeroEnviado;
            this.cl = this.router.getCurrentNavigation().extras.state.claveEnviado;
            this.img = this.router.getCurrentNavigation().extras.state.imagenEnviado;
          }
        })
      }
    })
  }

  modificarc(corre) {
    this.servicioBD.modificarUsuarios(this.id, this.c, this.n, this.a, this.nu, this.cl, this.img);
  }

  validar() {
    var correo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/


    if ((this.c.length < 1) || (this.n.length < 1) || (this.a.length < 1) || (this.nu.length < 1) || (this.cl.length < 1) || (this.cl2.length < 1)) {
      this.presentAlert4();
    }

    else if (!correo.test(this.c)) {
      this.presentAlert5();
    }

    else if (/[A-Z]/.test(this.nu) || /[a-z]/.test(this.nu)) {
      this.presentAlert7();
    }


    else if (this.nu.length != 8) {
      this.presentAlert3();
    }

    else if (!/[A-Z]/.test(this.c) || !/[0-9]/.test(this.c)) {
      this.presentAlert6();
    }

    else if (this.c.length < 8) {
      this.presentAlert2();
    }

    else if (this.cl != this.cl2) {
      this.presentAlert();
    }

    else {
      this.servicioBD.modificarUsuarios(this.id, this.c, this.n, this.a, this.nu, this.cl, this.img);
      this.presentToast();

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

  apicamara() {
    this.camara.takePicture();
  }

  ngOnInit() {

    this.camara.fetchcamara().subscribe(image => {
      this.foto = image;

    })

  }

}
