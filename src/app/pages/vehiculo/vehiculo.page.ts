import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage {

  corre = localStorage.getItem("correo");

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
  

  constructor(private router: Router, private activedRouter: ActivatedRoute, private toastCtrl: ToastController, public navCtrl:NavController, private alertController: AlertController, private servicioBD: BDService) {
    
   }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Vehiculo eliminado con exito.',
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(x) {
    const alert = await this.alertController.create({
      header: 'Estas seguro de que quieres eliminar el vehiculo?',
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
            this.eliminar(x);
          }
        },
      ],
    });
  
    await alert.present();
  }

  modificar(x){
    
    let navigationExtras: NavigationExtras = {
      state: {
        idEnviado: x.id_vehiculo,
        patenteEnviado: x.patente,
        marcaEnviado: x.marca,
        modeloEnviado: x.modelo,
        colorEnviado: x.color
      }
    }

    this.router.navigate(['/modi-vehiculo'], navigationExtras);

  }

  eliminar(x){
    this.servicioBD.eliminarVehiculos(x.id_vehiculo);
    this.servicioBD.presentToast("Vehiculo Eliminado");
  }

  vehiculo(corre){
    this.servicioBD.buscarVehiculosIniciar(this.corre);
  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.vehiculo(this.corre);
        this.servicioBD.fetchVehiculosIniciar().subscribe(item=>{
          this.arregloVehiculos = item;
        })
      }
    })
  }
  
  }
  
  


