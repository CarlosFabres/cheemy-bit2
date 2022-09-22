import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-viajeemp',
  templateUrl: './viajeemp.page.html',
  styleUrls: ['./viajeemp.page.scss'],
})
export class ViajeempPage implements OnInit {

  elim: string = "0";

  e:string="carlos@gmail.com"
  n:string="Carlos"

  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private toastCtrl: ToastController) { }

  terminarViaje() {
    let navigationExtras: NavigationExtras = {
      state: {
        eli: this.elim,
        correo: this.e,
        nom: this.n
      }
    }
    this.router.navigate(['/menu-p'], navigationExtras);
  
  }

  ngOnInit() {
  }

}
