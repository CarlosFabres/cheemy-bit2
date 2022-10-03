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

  iddevi: "";

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private toastCtrl: ToastController, private servicioBD: BDService) {
    this.activedRouter.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.iddevi = this.router.getCurrentNavigation().extras.state.idEnviado;
      }
    })
   }

  elim: string = "0";

  arregloDetalleViajes: any = [
    {
      id_detalle : "",
      idviaje : "",
      idusuario : ""
    }
  
  ]

  eliminarViaje() {
    let navigationExtras: NavigationExtras = {
      state: {
        eli: this.elim,
      }
    }
    this.router.navigate(['/menu-p'], navigationExtras);
  
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
            this.presentToast()
            this.eliminarViaje()
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

  detalleviaje(){
    this.servicioBD.buscarDetalleViajeIniciar(this.iddevi);
  }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.detalleviaje();
        //Hacer diferenciacion del detalleviaje del usuario que ha iniciado sesion
        this.servicioBD.fetchDetalleViajes().subscribe(item=>{
          this.arregloDetalleViajes = item;
        })
      }
    })
  }

}
