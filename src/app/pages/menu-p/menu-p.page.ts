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

  corre: string = "";
  

  eliminar:string = "";

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private servicioBD: BDService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.corre = this.router.getCurrentNavigation().extras.state.correoEnviado;
      }
    })
  }

  pasarDatos() {
    let navigationExtras: NavigationExtras = {
      state: {
        
      }
    }
    this.router.navigate(['/perfil'], navigationExtras);
  
  }

  pasarDatosViaje() {
    let navigationExtras: NavigationExtras = {
      state: {
        
      }
    }
    this.router.navigate(['/dato-v'], navigationExtras);
  
  }

  pasarDatosViaje2() {
    let navigationExtras: NavigationExtras = {
      state: {
        
      }
    }
    this.router.navigate(['/v-agendar'], navigationExtras);
  
  }

  pasarDatosMenu() {
    let navigationExtras: NavigationExtras = {
      state: {
        
      }
    }
    this.router.navigate(['/app'], navigationExtras);
  
  }

  usuario(corre){
    this.servicioBD.buscarUsuariosIniciar(this.corre);
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.usuario(this.corre);
        this.servicioBD.fetchUsuarios().subscribe(item=>{
          this.arregloUsuarios = item;
        })
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.arregloViajes = item;
        })
      }
    })
  }
}
