import { Component, OnInit } from '@angular/core';
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

  constructor(private servicioBD: BDService) { }

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
