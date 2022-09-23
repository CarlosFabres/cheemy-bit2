import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Detalleviaje } from './detalleviaje';
import { Puntaje } from './puntaje';
import { Tipousuario } from './tipousuario';
import { Titulo } from './titulo';
import { Usuario } from './usuario';
import { Vehiculo } from './vehiculo';
import { Viaje } from './viaje';

@Injectable({
  providedIn: 'root'
})
export class BDService {

   // variable para manipular la conexion a la base de datos
   public database: SQLiteObject;

   private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
   constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController) { 
     this.crearBD();
   }
 
   async presentToast(msj: string) {
     const toast = await this.toastController.create({
       message: msj,
       duration: 3000,
       icon: 'globe'
     });
 
     await toast.present();
   }
 
   
 
   crearBD() {
     //verificamos que la plataforma este lista
     this.platform.ready().then(() => {
       //creamos la BD
       this.sqlite.create({
         name: 'bdcheemy.db',
         location: 'default'
       }).then((db: SQLiteObject) => {
         //guardamos la conexion a la BD en la variable propia
         this.database = db;
         //llamar a la funcion para crear las tablas
         this.crearTablas();
       }).catch(e => {
         //muestro el mensaje de error en caso de ocurrir alguno
         this.presentToast("Error BD:" + e);
       })
     })
   }
 
   async crearTablas() {
     try {
      
        await this.database.executeSql(this.tablaTitulos, []);
        
        await this.database.executeSql(this.tablaPuntajes, []);
        
        await this.database.executeSql(this.tablaTipousuario, []);
        
        await this.database.executeSql(this.registroTipousuario, []);
        
        await this.database.executeSql(this.tablaUsuario, []);

        await this.database.executeSql(this.tablaVehiculo, []);

        await this.database.executeSql(this.tablaViaje, []);

        await this.database.executeSql(this.tablaDetalleViaje, []);
        
        this.isDBReady.next(true);
 
     } catch (e) {
       this.presentToast("Error Tablas: " + e);
     }
 
   }

   //-----------------------------------------------------------------------------------------------------------------------------------//

   //variable para la sentencia de creación de tabla
   tablaTitulos: string = "CREATE TABLE IF NOT EXISTS titulo(id_itulo NUMBER PRIMARY KEY, nombret VARCHAR(40) NOT NULL);";
   //variable para la sentencia de registros por defecto en la tabla
   listaTitulos = new BehaviorSubject([]);
   //observable para manipular si la BD esta lista  o no para su manipulación
 

   //FALTA INSERTAR LOS TITULOS CON SUS ID'S
   dbState3() {
     return this.isDBReady.asObservable();
   }
 
   fetchTitulos(): Observable<Titulo[]> {
     return this.listaTitulos.asObservable();
   }

   //-----------------------------------------------------------------------------------------------------------------------------------//

   //variable para la sentencia de creación de tabla
   tablaPuntajes: string = "CREATE TABLE IF NOT EXISTS puntaje(id_puntaje NUMBER PRIMARY KEY autoincrement, puntos NUMBER NOT NULL, FOREIGN KEY(id_titulo) REFERENCES titulo(id_titulo));";
   //variable para la sentencia de registros por defecto en la tabla
   listaPuntajes = new BehaviorSubject([]);
   //observable para manipular si la BD esta lista  o no para su manipulación
 
   //FALTA INSRTAR EL 0 EN PUNTOS
   dbState4() {
     return this.isDBReady.asObservable();
   }
 
   fetchPuntaje(): Observable<Puntaje[]> {
     return this.listaPuntajes.asObservable();
   }

   //-----------------------------------------------------------------------------------------------------------------------------------//

   //variable para la sentencia de creación de tabla
   tablaTipousuario: string = "CREATE TABLE IF NOT EXISTS tipousuario(id_tipo INTEGER PRIMARY KEY, nombre_tipo VARCHAR(40) NOT NULL);";
   //variable para la sentencia de registros por defecto en la tabla
   registroTipousuario: string = "INSERT or IGNORE INTO tipousuario(id_tipo, nombre_tipo) VALUES (1,'Pasajero'),(2,'Chofer');";
   //observable para manipular todos los registros de la tabla noticia
   listaTipousuarios = new BehaviorSubject([]);
   //observable para manipular si la BD esta lista  o no para su manipulación
   
    dbState() {
      return this.isDBReady.asObservable();
    }

    fetchTipousuarios(): Observable<Tipousuario[]> {
      return this.listaTipousuarios.asObservable();
    }
  
   //-----------------------------------------------------------------------------------------------------------------------------------//

   //variable para la sentencia de creación de tabla
   tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario VARCHAR(50) PRIMARY KEY, nombre VARCHAR(40) NOT NULL, apellido VARCHAR(40) NOT NULL, numero NUMBER NOT NULL, clave VARCHAR(25) NOT NULL, puntosusuario NUMBER, imagen File, FOREIGN KEY(id_tipo) REFERENCES tipousuario(id_tipo), FOREIGN KEY(id_puntaje) REFERENCES puntaje(id_puntaje));";
   //variable para la sentencia de registros por defecto en la tabla
   listaUsuarios = new BehaviorSubject([]);
   //observable para manipular si la BD esta lista  o no para su manipulación
 
   dbState2() {
     return this.isDBReady.asObservable();
   }
 
   fetchUsuarios(): Observable<Usuario[]> {
     return this.listaUsuarios.asObservable();
   }

   //-----------------------------------------------------------------------------------------------------------------------------------//


   //variable para la sentencia de creación de tabla
   tablaVehiculo: string = "CREATE TABLE IF NOT EXISTS vehiculo(id_vehiculo NUMBER PRIMARY KEY, color VARCHAR(40) NOT NULL, modelo VARCHAR(40) NOT NULL,  marca VARCHAR(40), FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario));";
   //variable para la sentencia de registros por defecto en la tabla
   listaVehiculos = new BehaviorSubject([]);
   //observable para manipular si la BD esta lista  o no para su manipulación
 

   //FALTA INSERTAR LOS TITULOS CON SUS ID'S
   dbState5() {
     return this.isDBReady.asObservable();
   }
 
   fetchVehiculos(): Observable<Vehiculo[]> {
     return this.listaVehiculos.asObservable();
   }

   //-----------------------------------------------------------------------------------------------------------------------------------//

      //variable para la sentencia de creación de tabla
      tablaViaje: string = "CREATE TABLE IF NOT EXISTS viaje(id_viaje NUMBER PRIMARY KEY, hora_salida number NOT NULL, asientos_dispo number NOT NULL, monto NUMBER NOT NULL, sector VARCHAR(5),destino VARCHAR(50),FOREIGN KEY(id_vehiculo) REFERENCES vehiculo(id_vehiculo));";
      //variable para la sentencia de registros por defecto en la tabla
      listaViajes = new BehaviorSubject([]);
      //observable para manipular si la BD esta lista  o no para su manipulación
    
   
      //FALTA INSERTAR LOS TITULOS CON SUS ID'S
      dbState6() {
        return this.isDBReady.asObservable();
      }
    
      fetchViajes(): Observable<Viaje[]> {
        return this.listaViajes.asObservable();
      }
   
  //-----------------------------------------------------------------------------------------------------------------------------------//
   
          //variable para la sentencia de creación de tabla
          tablaDetalleViaje: string = "CREATE TABLE IF NOT EXISTS detalleviaje(id_detalle NUMBER PRIMARY KEY, status VARCHAR(40) NOT NULL, FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY(id_viaje) REFERENCES viaje(id_viaje));";
          //variable para la sentencia de registros por defecto en la tabla
          listaDetallesViajes = new BehaviorSubject([]);
          //observable para manipular si la BD esta lista  o no para su manipulación
        
       
          //FALTA INSERTAR LOS TITULOS CON SUS ID'S
          dbState7() {
            return this.isDBReady.asObservable();
          }
        
          fetchDetallesViajes(): Observable<Detalleviaje[]> {
            return this.listaDetallesViajes.asObservable();
          }
       
  //-----------------------------------------------------------------------------------------------------------------------------------//
       
            

}
