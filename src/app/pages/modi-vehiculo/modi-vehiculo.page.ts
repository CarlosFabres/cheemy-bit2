import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-modi-vehiculo',
  templateUrl: './modi-vehiculo.page.html',
  styleUrls: ['./modi-vehiculo.page.scss'],
})
export class ModiVehiculoPage {

  id:string = "";
  p:string = "";
  m:string = "";
  o:string = "";
  l:string = "";



  constructor(private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private toastCtrl: ToastController,private servicioBD: BDService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.id = this.router.getCurrentNavigation().extras.state.idEnviado;
        this.p = this.router.getCurrentNavigation().extras.state.patenteEnviado;
        this.m = this.router.getCurrentNavigation().extras.state.marcaEnviado;
        this.o = this.router.getCurrentNavigation().extras.state.modeloEnviado;
        this.l = this.router.getCurrentNavigation().extras.state.colorEnviado;
      }
    })
   }

    modificarDatos2(){

      if ((this.p.length < 1 ) || (this.m.length < 1 ) || (this.o.length < 1 ) || (this.l.length < 1 )) {
        this.presentAlert4();
      }

      else if ((this.p.length != 6 )) {
        this.presentAlert();
      }
  
      else {
        this.servicioBD.modificarVehiculos(this.id,this.p,this.m,this.o,this.l);
        this.presentToast();
        this.router.navigate(['/vehiculo']);
      }
    }

    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Patente invalida',
        message: 'La patente no es valida',
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
  
    async presentToast() {
      const toast = await this.toastCtrl.create({
        message: 'Vehiculo modificado con exito.',
        duration: 2000
      });
      toast.present();
    }
}



