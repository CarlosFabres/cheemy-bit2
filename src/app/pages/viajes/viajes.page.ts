import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BDService } from 'src/app/services/bd.service';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

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

  constructor(private servicioBD: BDService, private router: Router) { }


  verViaje(x){
    
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id_viaje
      }
    }

    this.router.navigate(['/dato-v'], navigationExtras);

  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.servicioBD.fetchViajes().subscribe(item=>{
          this.arregloViajes = item;
        })
      }
    })
  }

}
