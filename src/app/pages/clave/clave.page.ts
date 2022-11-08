import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-clave',
  templateUrl: './clave.page.html',
  styleUrls: ['./clave.page.scss'],
})
export class ClavePage implements OnInit {

  corre = localStorage.getItem("correo");

  contra = "";
  contra1 = "";
  contra2 = "";

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
      idtipo : "",
      idtitulo : ""
    }
  ]

  constructor(private servicioBD: BDService, private alertController: AlertController) { }

  cambiarClave(){
    if(this.contra != this.arregloUsuarios[0].clave){
      this.presentAlert();
    }else{
      if (!/[A-Z]/.test(this.contra1) || !/[0-9]/.test(this.contra1)) {
        this.presentAlert6();
      }
  
      else if (this.contra1.length < 7) {
        this.presentAlert2();
      }
  
      else if (this.contra1 != this.contra2) {
        this.presentAlert();
      }
      else{
        this.servicioBD.modificarUsuariosContra(this.corre, this.arregloUsuarios[0].id_usuario ,this.contra1);
        this.servicioBD.presentToast("Perfil modificado.");
      }
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Contraseña incorrecta',
      message: 'La contraseña que introdujo no es correcta',
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

  usuario(corre){
    this.servicioBD.buscarUsuariosIniciar(this.corre);
  }
  

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.usuario(this.corre);
        //Hacer diferenciacion del detalleviaje del usuario que ha iniciado sesion
        this.servicioBD.fetchUsuariosIniciar().subscribe(item=>{
          this.arregloUsuarios = item;
        })
      }
    })
  }

}
