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


  

  eliminar:string = "";

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private servicioBD: BDService) {

  }

  

  

  

  usuario(corre){
    this.servicioBD.buscarUsuariosIniciar(this.corre);
  }

  vehiculo(corre){
    this.servicioBD.buscarVehiculosIniciar(this.corre);
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.usuario(this.corre);
        this.vehiculo(this.corre);
        this.servicioBD.fetchUsuariosIniciar().subscribe(item=>{
          this.arregloUsuarios = item;
        })
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.arregloViajes = item;
        })
      }
    })
  }
}
