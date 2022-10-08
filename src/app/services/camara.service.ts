import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CamaraService {
  image: any;

  constructor(private camera: Camera) { }

  imagenes = new BehaviorSubject([]);
  fetchcamara(): Observable<any> {
    return this.imagenes.asObservable();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.camera.getPicture(options).then((imageData => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
      this.imagenes.next(this.image);
    }))
  }

}
