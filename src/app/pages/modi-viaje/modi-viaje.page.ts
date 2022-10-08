import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-modi-viaje',
  templateUrl: './modi-viaje.page.html',
  styleUrls: ['./modi-viaje.page.scss'],
})
export class ModiViajePage implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private toastCtrl: ToastController, private activedRouter: ActivatedRoute,private servicioBD: BDService) { 
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.idviaje = this.router.getCurrentNavigation().extras.state.idEnviado;
        this.horario = this.router.getCurrentNavigation().extras.state.horaEnviado;
        this.asientos = this.router.getCurrentNavigation().extras.state.asientosEnviado;
        this.tarifa = this.router.getCurrentNavigation().extras.state.montoEnviado;
        this.sector = this.router.getCurrentNavigation().extras.state.sectorEnviado;
        this.destino = this.router.getCurrentNavigation().extras.state.destinoEnviado;
      }
    })
  }

  idviaje: string = "";
  horario: string = "";
  destino: string = "";
  tarifa: string = "";
  asientos: string = "";
  sector: string = "";

  pasarDatos(){

    if((this.horario == "" ) || (this.destino == "" ) || (this.tarifa == "" ) || (this.asientos == "" ) || (this.sector == "")){
      this.presentAlert4();
    }
    else if ((this.horario.length != 5 )) {
      this.presentAlert();
    }
    else if ((this.asientos.length < 1) || (this.asientos.length > 1)){
      this.presentAlert5();
    }
    else if (/[A-Z]/.test(this.tarifa) || /[a-z]/.test(this.tarifa)){
      this.presentAlert9();
    }
    else if(/[A-Z]/.test(this.asientos) || /[a-z]/.test(this.asientos)){
      this.presentAlert7();
    }
    else if ((this.sector.length < 1) || (this.sector.length > 1)){
      this.presentAlert6();
    }
    else if(/[0-9]/.test(this.sector)){
      this.presentAlert8();
    }

    else {
      this.servicioBD.modificarViajes(this.idviaje,this.horario,this.destino,this.tarifa,this.asientos,this.sector);
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
      header: 'Error/Asiento',
      message: 'Solo un numero',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  async presentAlert6() {
    const alert = await this.alertController.create({
      header: 'Error/Sector',
      message: 'Solo una letra',
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

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Viaje modificado con exito.',
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


