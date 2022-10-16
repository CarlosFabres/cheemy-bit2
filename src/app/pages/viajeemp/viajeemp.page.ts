import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-viajeemp',
  templateUrl: './viajeemp.page.html',
  styleUrls: ['./viajeemp.page.scss'],
})
export class ViajeempPage implements OnInit {

  elim: string = "0";

  e: string = "carlos@gmail.com"
  n: string = "Carlos"



  constructor(public toastController: ToastController, private router: Router, private activedRouter: ActivatedRoute, private alertController: AlertController, private menuCtrl: MenuController, private toastCtrl: ToastController, private geolocation: Geolocation) { }

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

  ionViewDidEnter() {

    this.createMap();
  }

  latGet=localStorage.getItem('lat');
  longGet=localStorage.getItem('lng');
  

  ngOnInit() {
  }
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;


  //Mapa
  async createMap() {

    try {
      this.newMap = await GoogleMap.create({
        id: 'capacitor-google-maps',
        element: this.mapRef.nativeElement,
        apiKey: environment.google_maps_api_key,
        config: {
          center: {
            lat: parseFloat(this.latGet),
            lng: parseFloat(this.longGet),
          },
          zoom: 15,
        },

      });
      console.log('newmap', this.newMap);
      this.locate();
      //await this.addMarker(this.laat, this.lnng);
      //await this.addListeners();
    }
    catch (e) {
      console.log(e);
      // alert(e);
    }
  }
  async locate() {
    if (this.newMap) await this.newMap.enableCurrentLocation(true);
  }
}
