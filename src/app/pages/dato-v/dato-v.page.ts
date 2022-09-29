import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-dato-v',
  templateUrl: './dato-v.page.html',
  styleUrls: ['./dato-v.page.scss'],
})
export class DatoVPage implements OnInit {

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

  idvi = "";
  e: string = "";
  c: string = "";
  n: string = "";
  a: string = "";

  eliminar: string= "";

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private toastCtrl: ToastController,private servicioBD: BDService) { 
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.idvi = this.router.getCurrentNavigation().extras.state.idEnviado;

      }
    })

    console.log(this.eliminar);
  }

  

  eliminarViaje() {
    this.eliminar="hola";
    let navigationExtras: NavigationExtras = {
      state: {
        eli: '1',
        correo: this.e,
        contra: this.c,
        nom: this.n,
        ape: this.a
      }
    }
    this.presentToast();
    this.router.navigate(['/menu-p'], navigationExtras);
  
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Viaje agendado con exito.',
      duration: 2000
    });
    toast.present();
  }

  private isDisplayImage: boolean = false;
  // function
  displayImage() {
    this.isDisplayImage = !this.isDisplayImage;
  }
  
  viaje(idvi){
    this.servicioBD.buscarViajesIniciar(this.idvi);
  }

  usuario(idvi){
    this.servicioBD.buscarUsuariosViaje(this.idvi);
  }

  vehiculo(idvi){
    this.servicioBD.buscarVehiculosViaje(this.idvi);
  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.viaje(this.idvi);
        this.usuario(this.idvi);
        this.vehiculo(this.idvi);
        this.servicioBD.fetchViajesIniciar().subscribe(item=>{
          this.arregloViajes = item;
        })
        this.servicioBD.fetchUsuariosViaje().subscribe(item=>{
          this.arregloUsuarios = item;
        })
        this.servicioBD.fetchVehiculosViaje().subscribe(item=>{
          this.arregloViajes = item;
        })
      }
    })
  }

}
