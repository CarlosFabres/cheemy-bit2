import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

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
    }

  ]

  constructor(private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, public navCtrl:NavController, private servicioBD: BDService) {
    
  }


async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Estas seguro de que quieres cerrar sesion?',
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
          this.navCtrl.navigateRoot('/login');
        }
      },
    ],
  });

  await alert.present();
}

ngOnInit() {
  this.servicioBD.dbState().subscribe(res=>{
    if(res){
      this.servicioBD.fetchUsuarios().subscribe(item=>{
        this.arregloUsuarios = item;
      })
    }
  })
}


  /*modificarDatos2(){
    let navigationExtras: NavigationExtras = {
      state: {
        em: this.e,
        con: this.c,
        nom: this.n,
        ape: this.a
      }
  }
  this.router.navigate(['/modi-cuenta'], navigationExtras);
}
*/
}
