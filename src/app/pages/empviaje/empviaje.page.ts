import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-empviaje',
  templateUrl: './empviaje.page.html',
  styleUrls: ['./empviaje.page.scss'],
})
export class EmpviajePage implements OnInit {

  idvi: "";

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private toastCtrl: ToastController, private servicioBD: BDService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.idvi = this.router.getCurrentNavigation().extras.state.idEnviado;
      }
    })
   }

  elim: string = "0";

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
      idtitulo: ""
    }
  ]

  arregloViajes: any = [
    {
      id_viaje : "",
      hora_salida: "",
      asientos_dispo : "",
      asientos_ocupa : "",
      monto : "",
      sector : "",
      destino : "",
      idvehiculo : "",
      idusuario : ""
    }
  
  ]

  modificar(){
    
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: this.arregloViajes[0].id_viaje,
        horaEnviado: this.arregloViajes[0].hora_salida,
        asientosEnviado: this.arregloViajes[0].asientos_dispo,
        asientosOEnviado: this.arregloViajes[0].asientos_ocupa,
        montoEnviado: this.arregloViajes[0].monto,
        sectorEnviado: this.arregloViajes[0].sector,
        destinoEnviado: this.arregloViajes[0].destino
      }
    }

    this.router.navigate(['/modi-viaje'], navigationExtras);

  }

  empezarViaje(){
    if(this.arregloViajes[0].asientos_ocupa == 0){
      this.servicioBD.presentToast("No puedes iniciar el viaje sin ningun pasajero.");
    }else{
      this.servicioBD.eliminarViajeConductor(this.idvi);
      this.servicioBD.eliminarViajePasajeroConductor(this.idvi);
      this.servicioBD.sumarPuntos(this.arregloUsuarios[0].id_usuario,this.arregloUsuarios[0].correo);
      this.cambiarTitulo();
      this.servicioBD.presentToast("Viaje empezado");
      this.router.navigate(['/viajeemp']);
    }
  }

  cambiarTitulo(){
    if(this.arregloUsuarios[0].puntos == 1000){
      this.servicioBD.updatePuntos1(this.arregloUsuarios[0].id_usuario,this.arregloUsuarios[0].correo);
    }
    else if(this.arregloUsuarios[0].puntos == 2000){
      this.servicioBD.updatePuntos2(this.arregloUsuarios[0].id_usuario,this.arregloUsuarios[0].correo);
    }
    else if(this.arregloUsuarios[0].puntos == 3000){
      this.servicioBD.updatePuntos3(this.arregloUsuarios[0].id_usuario,this.arregloUsuarios[0].correo);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Estas seguro?',
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
            this.eliminarVC()
          }
        },
      ],
    });
  
    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Estas seguro de empezar el viaje?\nDespues de empezar se eliminara el viaje',
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
            this.empezarViaje()
          }
        },
      ],
    });
  
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Viaje eliminado con exito.',
      duration: 2000
    });
    toast.present();
  }

  eliminarVC(){
    this.servicioBD.eliminarViajeConductor(this.idvi);
    this.servicioBD.eliminarViajePasajeroConductor(this.idvi);
    this.servicioBD.presentToast("Viaje Eliminado");
    this.router.navigate(['/menu-p']);
  }

  viaje(){
    this.servicioBD.buscarViajesIniciar(this.idvi);
  }

  usuario(){
    this.servicioBD.buscarUsuariosViaje(this.idvi);
  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.viaje();
        this.usuario();
        //Hacer diferenciacion del detalleviaje del usuario que ha iniciado sesion
        this.servicioBD.fetchViajesIniciar().subscribe(item=>{
          this.arregloViajes = item;
        })
        this.servicioBD.fetchUsuariosViaje().subscribe(item=>{
          this.arregloUsuarios = item;
        })
      }
    })
  }

}
