import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-v-agendar',
  templateUrl: './v-agendar.page.html',
  styleUrls: ['./v-agendar.page.scss'],
})
export class VAgendarPage implements OnInit {

  e: string = "";
  c: string = "";
  n: string = "";
  a: string = "";

  eliminar: string = "";

  iddevi = "";

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

  arregloDetalleViajeIniciar: any = [
    {
      id_detalle : "",
      idviaje : "",
      idusuario : ""
    }
  
  ]

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private toastCtrl: ToastController, private servicioBD: BDService) { 
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.iddevi = this.router.getCurrentNavigation().extras.state.idEnviado;
        
      }
    })
  }

  elim: string = "a";

  eliminarViaje() {
    let navigationExtras: NavigationExtras = {
      state: {
        eli: '0',
        correo: this.e,
        contra: this.c,
        nom: this.n,
        ape: this.a
      }
    }
    this.router.navigate(['/menu-p'], navigationExtras);
  
  }

  async presentAlert(x) {
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
            this.presentToast()
            this.eliminarVP(x)
          }
        },
      ],
    });
  
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Viaje cancelado con exito.',
      duration: 2000
    });
    toast.present();
  }

  private isDisplayImage: boolean = false;
  // function
  displayImage() {
    this.isDisplayImage = !this.isDisplayImage;
  }

  detalleviaje(){
    this.servicioBD.buscarDetalleViajeIniciar(this.iddevi);
  }

  eliminarVP(x){
    this.servicioBD.eliminarViajePajasero(this.iddevi);
    this.servicioBD.restarViajeAsiento(x.id_viaje)
    this.servicioBD.presentToast("Viaje Eliminado");
    this.router.navigate(['/menu-p'])
  }

  viaje(){
    this.servicioBD.eliminarViajePajasero(this.iddevi);
  }

  viaje2(idvi){
    this.servicioBD.buscarViajesIniciarPasajero(this.iddevi);
  }

  usuario(idvi){
    this.servicioBD.buscarUsuariosViajePasajero(this.iddevi);
  }

  vehiculo(idvi){
    this.servicioBD.buscarVehiculosViajePasajero(this.iddevi);
  }
  
  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.detalleviaje();
        this.viaje2(this.iddevi);
        this.usuario(this.iddevi);
        this.vehiculo(this.iddevi);
        this.servicioBD.fetchViajesIniciarPasajero().subscribe(item=>{
          this.arregloViajes = item;
        })
        this.servicioBD.fetchUsuariosViajePasajero().subscribe(item=>{
          this.arregloUsuarios = item;
        })
        this.servicioBD.fetchVehiculosViajePasajero().subscribe(item=>{
          this.arregloVehiculos = item;
        })
        //Hacer diferenciacion del detalleviaje del usuario que ha iniciado sesion
        this.servicioBD.fetchDetalleViajeIniciar().subscribe(item=>{
          this.arregloDetalleViajeIniciar = item;
        })
      }
    })
  }

}
