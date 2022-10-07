import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-cviajes',
  templateUrl: './cviajes.page.html',
  styleUrls: ['./cviajes.page.scss'],
})
export class CviajesPage implements OnInit {

  horario: string = "";
  destino: string = "";
  tarifa: string = "";
  asientos: string = "";
  sector: string = "";

  eliminar: string= "";

  constructor(private router: Router, private alertController: AlertController, private toastCtrl: ToastController, private servicioBD: BDService) { }

  e:string="vicente@gmail.com"
  n:string="Vicente"
  
  corre = localStorage.getItem("correo");

  arregloVehiculos: any = [
    {
      id_vehiculo : "",
      patente: "",
      color : "",
      modelo : "",
      marca : "",
      idusuario : ""
    }

  ]

  pasarDatos(){

    
    if((this.horario.length < 1 ) || (this.destino.length < 1 ) || (this.tarifa.length < 1 ) || (this.asientos.length < 1 ) || (this.sector.length < 1)){
      this.presentAlert4();
    }
    else if ((this.horario.length != 5 )) {
      this.presentAlert();
    }
    else if ((this.asientos.length != 1)){
      this.presentAlert5();
    }
    else if (/[A-Z]/.test(this.tarifa) || /[a-z]/.test(this.tarifa)){
      this.presentAlert9();
    }
    else if(/[A-Z]/.test(this.asientos) || /[a-z]/.test(this.asientos)){
      this.presentAlert7();
    }
    else if ((this.sector.length != 1)){
      this.presentAlert6();
    }
    else if(/[0-9]/.test(this.sector)){
      this.presentAlert8();
    }
    

    else {
      
      this.sexo2();
    }
  }

  sexo2(){
    if(this.arregloVehiculos[0].patente == null){
      this.verificarAuto();
    }
    else{
      this.servicioBD.insertarViajes(this.horario,this.asientos,this.tarifa,this.sector,this.destino, this.arregloVehiculos[0].id_vehiculo);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Horario invalido',
      message: 'La hora no es valida',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
  async verificarAuto() {
    const alert = await this.alertController.create({
      header: 'Auto',
      message: 'Debes tener un auto para crear un viaje',
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
      header: 'Limite/Asiento',
      message: 'Solo un numero',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert6() {
    const alert = await this.alertController.create({
      header: 'Limite/Sector',
      message: 'Solo un numero',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert7() {
    const alert = await this.alertController.create({
      header: 'Error/Asientos',
      message: 'Solo numeros',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert8() {
    const alert = await this.alertController.create({
      header: 'Error/Sector',
      message: 'Solo letras',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert9() {
    const alert = await this.alertController.create({
      header: 'Error/Tarifa',
      message: 'Solo numeros',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  private isDisplayImage: boolean = false;
  // function
  displayImage() {
    this.isDisplayImage = !this.isDisplayImage;
  }
  

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Viaje creado con exito.',
      duration: 2000
    });
    toast.present();
  }

  vehiculo(corre){
    this.servicioBD.buscarVehiculosIniciar(this.corre);
  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.vehiculo(this.corre);
        this.servicioBD.fetchVehiculosIniciar().subscribe(item=>{
          this.arregloVehiculos = item;
        })
      }
    })
  }
}
