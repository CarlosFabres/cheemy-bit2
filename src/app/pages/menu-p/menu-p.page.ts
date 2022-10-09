import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-menu-p',
  templateUrl: './menu-p.page.html',
  styleUrls: ['./menu-p.page.scss'],
})
export class MenuPPage {

  corre = localStorage.getItem("correo");

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

  arregloDetalleViajes: any = [
    {
      id_detalle : "",
      idviaje : "",
      idusuario : ""
    }
  
  ]

  arregloTitulos: any = [
    {
      id_titulo : "",
      nombret : "",
      puntost : ""
    }
  
  ]


  

  eliminar:string = "";

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private servicioBD: BDService) {

  }

  
  verViajePajasero(y){
    
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: y.id_detalle
      }
    }

    this.router.navigate(['/v-agendar'], navigationExtras);

  }

  verViajeConductor(x){
    
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id_viaje
      }
    }

    this.router.navigate(['/empviaje'], navigationExtras);

  }
  

  

  usuario(corre){
    this.servicioBD.buscarUsuariosIniciar(this.corre);
  }

  vehiculo(corre){
    this.servicioBD.buscarVehiculosIniciar(this.corre);
  }

  detalleviaje(corre){
    this.servicioBD.buscarDetalleViajeIniciarPajasero(this.corre);
  }

  viaje(){
    this.servicioBD.buscarViajes();
  }

  titulo(corre){
    this.servicioBD.buscarTituloIniciar(this.corre);
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.usuario(this.corre);
        this.vehiculo(this.corre);
        this.titulo(this.corre);
        this.detalleviaje(this.corre);
        this.viaje();
        //Hacer diferenciacion del detalleviaje del usuario que ha iniciado sesion
        this.servicioBD.fetchUsuariosIniciar().subscribe(item=>{
          this.arregloUsuarios = item;
        })
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.arregloViajes = item;
        })
        this.servicioBD.fetchDetalleViajesIniciarPajasero().subscribe(item=>{
          this.arregloDetalleViajes = item;
        })
        this.servicioBD.fetchTituloIniciar().subscribe(item=>{
          this.arregloTitulos = item;
        })
      }
    })
  }
}
