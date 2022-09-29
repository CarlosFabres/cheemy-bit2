import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { BDService } from 'src/app/services/bd.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  arregloUsuarios: any = [
    {
      id_usuario : "",
      correo: "",
      puntos : "",
      nombre : "",
      apellido : "",
      numero : "",
      clave : "",
      imagen : "",
      idtipo : ""
    }

  ]

  corre = "";
  clave = "";

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


  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController,private servicioBD: BDService) {
    
  }

  login(){
    this.servicioBD.loginUsuario(this.corre,this.clave);
    localStorage.setItem('correo', this.corre);
    localStorage.setItem('id_usuario', this.arregloUsuarios.id_usuario);
    
    this.corre="";
    this.clave="";
  }



  validar() {
    let lista1: string[] = ["vicente@gmail.com", "carlos@gmail.com", this.e];
    let lista2: string[] = ["Vicente123", "Carlos123", this.c];

    if ((this.corre.length < 1) || (this.clave.length < 1)) {
      this.presentAlert4();
    }
    else if ((this.corre != lista1[0] || this.clave != lista2[0]) && (this.corre != lista1[1] || this.clave != lista2[1]) && (this.corre != lista1[2] || this.clave != lista2[2])) {
      this.presentAlert();
    }
    else {
      
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

  usuario(corre){
    this.servicioBD.buscarUsuariosIniciar(this.corre);
  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.usuario(this.corre);
        this.servicioBD.fetchUsuariosIniciar().subscribe(item=>{
          this.arregloUsuarios = item;
        })
      }
    })
  }
  

}
