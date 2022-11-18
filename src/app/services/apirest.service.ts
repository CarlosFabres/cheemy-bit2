import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
 import { retry, catchError } from 'rxjs/operators'; 
 import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  getUsers(): Observable<any> { return this.http.get(this.apiURL + '/users/').pipe(retry(3)); }

  getVehiculos(): Observable<any> { return this.http.get(this.apiURL2 + '/autos/').pipe(retry(3)); }

  constructor(private http: HttpClient) { }
  apiURL = 'https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos';

  apiURL2 = 'https://my-json-server.typicode.com/victorrosendo/repoListadoAutos';

  getProducts(){
    return this.http.get('https://my-json-server.typicode.com/victorrosendo/repoUsuariosRamos');
    
  }
}

