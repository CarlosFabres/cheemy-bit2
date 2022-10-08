import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from './login';
import { Tipousuario } from './tipousuario';
import { Titulo } from './titulo';
import { Usuario } from './usuario';
import { Vehiculo } from './vehiculo';
import { Viaje } from './viaje';

//API
import { ApirestService } from './apirest.service';
import { Detalleviaje } from './detalleviaje';

@Injectable({
  providedIn: 'root'
})
export class BDService {

  // variable para manipular la conexion a la base de datos
  public database: SQLiteObject;

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private router: Router, public Apirest: ApirestService) {
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

      await this.database.executeSql(this.registroTitulos, []);

      await this.database.executeSql(this.tablaTipousuario, []);

      await this.database.executeSql(this.registroTipousuario, []);

      await this.database.executeSql(this.tablaUsuario, []);

      await this.database.executeSql(this.registroUsuario, []);

      await this.database.executeSql(this.registroUsuario2, []);

      await this.database.executeSql(this.tablaVehiculo, []);

      await this.database.executeSql(this.registroVehiculo, []);

      await this.database.executeSql(this.tablaViaje, []);

      await this.database.executeSql(this.registroViaje, []);

      await this.database.executeSql(this.registroViaje2, []);

      await this.database.executeSql(this.tablaDetalleViaje, []);

      this.buscarTitulos();

      this.buscarViajes();

      this.buscarVehiculos();

      this.buscarUsuarios();

      this.buscarDetalleViaje();

      this.isDBReady.next(true);

    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }
  }

  //LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN----LOGIN

  listaLogin = new BehaviorSubject([]);

  fetchLogin(): Observable<Login[]> {
    return this.listaLogin.asObservable();
  }

  //TITULO-----TITULO-----TITULO-----TITULO-----TITULO-----TITULO-----TITULO-----TITULO-----TITULO-----TITULO-----TITULO-----TITULO-------------------------//


  tablaTitulos: string = "CREATE TABLE IF NOT EXISTS titulo(id_titulo INTEGER PRIMARY KEY, nombret VARCHAR(40) NOT NULL,puntost NUMERIC NOT NULL);";

  registroTitulos: string = "INSERT or IGNORE INTO titulo(id_titulo, nombret,puntost) VALUES (1,'siwi',0),(2,'apapa',1000);";
  listaTitulos = new BehaviorSubject([]);



  fetchTitulos(): Observable<Titulo[]> {
    return this.listaTitulos.asObservable();
  }

  //TIPOUSUARIO-----TIPOUSUARIO-----TIPOUSUARIO-----TIPOUSUARIO-----TIPOUSUARIO-----TIPOUSUARIO-----TIPOUSUARIO-----TIPOUSUARIO-----TIPOUSUARIO-----TIPOUSUARIO-------------//

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

  //USUARIO-----USUARIO-----USUARIO-----USUARIO-----USUARIO-----USUARIO-----USUARIO-----USUARIO-----USUARIO-----USUARIO-----USUARIO-----USUARIO-----USUARIO-----USUARIO------------------------//

  //variable para la sentencia de creación de tabla
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY, correo VARCHAR(100) NOT NULL, nombre VARCHAR(40) NOT NULL, apellido VARCHAR(40) NOT NULL, numero NUMERIC NOT NULL, clave VARCHAR(25) NOT NULL, puntos NUMERIC, imagen BLOB,idtipo INTEGER,idtitulo INTEGER, FOREIGN KEY(idtipo) REFERENCES tipousuario(id_tipo), FOREIGN KEY(idtitulo) REFERENCES titulo(id_titulo));";
  //variable para la sentencia de registros por defecto en la tabla
  registroUsuario: string = "INSERT or IGNORE INTO usuario(id_usuario, correo, puntos, nombre, apellido, numero, clave, imagen, idtipo,idtitulo) VALUES (1,'a@a.com',0,'vicente','echeverria',123332323,'Pepe1',NULL,2,1);";
  registroUsuario2: string = "INSERT or IGNORE INTO usuario(id_usuario, correo, puntos, nombre, apellido, numero, clave, imagen, idtipo,idtitulo) VALUES (2,'e@e.com',0,'Pepe','Soto',292188321,'Caca1',NULL,1,1);";
  listaUsuarios = new BehaviorSubject([]);
  //observable para manipular si la BD esta lista  o no para su manipulación

  fetchUsuarios(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }

  //VEHICULO-----VEHICULO-----VEHICULO-----VEHICULO-----VEHICULO-----VEHICULO-----VEHICULO-----VEHICULO-----VEHICULO-----VEHICULO-----VEHICULO-----VEHICULO--------//


  //variable para la sentencia de creación de tabla
  tablaVehiculo: string = "CREATE TABLE IF NOT EXISTS vehiculo(id_vehiculo INTEGER PRIMARY KEY autoincrement,patente VARCHAR(10) , color VARCHAR(40) NOT NULL, modelo VARCHAR(40),  marca VARCHAR(40),idusuario INTEGER, FOREIGN KEY(idusuario) REFERENCES usuario(id_usuario));";
  //variable para la sentencia de registros por defecto en la tabla
  registroVehiculo: string = "INSERT or IGNORE INTO vehiculo(id_vehiculo,patente, color, modelo, marca, idusuario) VALUES (1,'as21kd','rojo','tesla','k2',1);";
  listaVehiculos = new BehaviorSubject([]);
  //observable para manipular si la BD esta lista  o no para su manipulación


  //FALTA INSERTAR LOS TITULOS CON SUS ID'S


  fetchVehiculos(): Observable<Vehiculo[]> {
    return this.listaVehiculos.asObservable();
  }

  //VIAJE-----VIAJE-----VIAJE-----VIAJE-----VIAJE-----VIAJE-----VIAJE-----VIAJE-----VIAJE-----VIAJE-----VIAJE-----VIAJE-----VIAJE-----VIAJE--------------//

  //variable para la sentencia de creación de tabla
  tablaViaje: string = "CREATE TABLE IF NOT EXISTS viaje(id_viaje INTEGER PRIMARY KEY autoincrement, hora_salida VARCHAR(5) NOT NULL, asientos_dispo NUMERIC NOT NULL,asientos_ocupa NUMERIC NOT NULL, monto NUMERIC NOT NULL, sector VARCHAR(5),destino VARCHAR(50),idvehiculo INTEGER, FOREIGN KEY(idvehiculo) REFERENCES vehiculo(id_vehiculo));";
  //variable para la sentencia de registros por defecto en la tabla
  registroViaje: string = "INSERT or IGNORE INTO viaje(id_viaje, hora_salida,asientos_dispo,asientos_ocupa,monto,sector,destino,idvehiculo) VALUES (1,'12:13',4,4,1000,'a','Til-til',1);";
  registroViaje2: string = "INSERT or IGNORE INTO viaje(id_viaje, hora_salida,asientos_dispo,asientos_ocupa,monto,sector,destino,idvehiculo) VALUES (2,'15:08',6,0,3000,'b','Valle big',1);";
  listaViajes = new BehaviorSubject([]);
  //observable para manipular si la BD esta lista  o no para su manipulación


  //FALTA INSERTAR LOS TITULOS CON SUS ID'S


  fetchViajes(): Observable<Viaje[]> {
    return this.listaViajes.asObservable();
  }

  //DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE-----DETALLEVIAJE--------------//

  tablaDetalleViaje: string = "CREATE TABLE IF NOT EXISTS DetalleViaje(id_detalle INTEGER PRIMARY KEY autoincrement,idusuario INTEGER, idviaje INTEGER, FOREIGN KEY(idusuario) REFERENCES usuario(id_usuario), FOREIGN KEY(idviaje) REFERENCES viaje(id_viaje));";

  listaDetalleViajes = new BehaviorSubject([]);

  fetchDetalleViajes(): Observable<Detalleviaje[]> {
    return this.listaDetalleViajes.asObservable();
  }
  //------------------------------------------METODOS---------------------------------------------------//   
  //Titulo-----------------------------------------------------------------------      
  buscarTitulos() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM titulo', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Titulo[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_titulo: res.rows.item(i).id_titulo,
            nombret: res.rows.item(i).nombret,
            puntost: res.rows.item(i).puntost,
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaTitulos.next(items);
    })
  }
  //Vehiculo----------------------------------------------------------------
  buscarVehiculos() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM vehiculo', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Vehiculo[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_vehiculo: res.rows.item(i).id_vehiculo,
            patente: res.rows.item(i).patente,
            color: res.rows.item(i).color,
            modelo: res.rows.item(i).modelo,
            marca: res.rows.item(i).marca,
            idusuario: res.rows.item(i).idusuario
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaVehiculos.next(items);
    })
  }

  insertarVehiculos(patente, marca, modelo, color, id_usuario, correo) {
    let data = [patente, color, modelo, marca, id_usuario];
    return this.database.executeSql('INSERT INTO vehiculo(patente,color,modelo,marca,idusuario) VALUES (?,?,?,?,?)', data).then(res => {
      this.buscarVehiculosIniciar(correo);
    });

  }


  modificarVehiculos(id_vehiculo, patente, marca, modelo, color,corre) {
    let data = [patente, color, modelo, marca, id_vehiculo];
    return this.database.executeSql('UPDATE vehiculo SET patente = ?, color = ?,modelo = ?,marca = ? WHERE id_vehiculo = ?', data).then(data2 => {
      this.buscarVehiculosIniciar(corre);
      this.router.navigate(['/vehiculo']);
    })
  }

  eliminarVehiculos(id_vehiculo, corre) {
    let data = [id_vehiculo]
    return this.database.executeSql('DELETE FROM vehiculo WHERE id_vehiculo = ?', data).then(a => {
      this.buscarVehiculosIniciar(corre);
      this.router.navigate(['/vehiculo']);
    })

  }

  //Usuario-----------------------------------------------------------------------------------------

  buscarUsuarios() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Usuario[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            correo: res.rows.item(i).correo,
            puntos: res.rows.item(i).puntos,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            numero: res.rows.item(i).numero,
            clave: res.rows.item(i).clave,
            imagen: res.rows.item(i).imagen,
            idtipo: res.rows.item(i).idtipo,
            idtitulo: res.rows.item(i).idtitulo
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaUsuarios.next(items);
    })
  }

  modificarUsuarios(id_usuario, corre, nombre, apellido, numero, clave, imagen) {
    let data = [nombre, apellido, numero, clave, imagen, id_usuario];
    return this.database.executeSql('UPDATE usuario SET nombre = ?,apellido = ?,numero = ?,clave = ?, imagen = ? WHERE id_usuario = ?', data).then(data2 => {
      this.buscarUsuariosIniciar(corre);
      this.router.navigate(['/perfil']);

    })
  }

  //Viaje------------------------------------------------------------------------------------

  buscarViajes() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM viaje', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Viaje[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_viaje: res.rows.item(i).id_viaje,
            hora_salida: res.rows.item(i).hora_salida,
            asientos_dispo: res.rows.item(i).asientos_dispo,
            asientos_ocupa: res.rows.item(i).asientos_ocupa,
            monto: res.rows.item(i).monto,
            sector: res.rows.item(i).sector,
            destino: res.rows.item(i).destino,
            idvehiculo: res.rows.item(i).idvehiculo
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaViajes.next(items);
    })
  }

  insertarViajes( hora_salida, asientos_dispo, monto, sector, destino, id_vehiculo) {
    let data = [ hora_salida, asientos_dispo, monto, sector, destino, id_vehiculo];
    return this.database.executeSql('INSERT INTO viaje(hora_salida,asientos_dispo,asientos_ocupa,monto,sector,destino,idvehiculo) VALUES (?,?,0,?,?,?,?)', data).then(res => {
      this.buscarViajes();
      this.router.navigate(['/viajes'])
    });

  }


  modificarViajes(id_viaje, hora_salida, destino, monto, asientos_dispo, sector) {
    let data = [hora_salida, asientos_dispo, monto, sector, destino, id_viaje];
    return this.database.executeSql('UPDATE viaje SET hora_salida = ?, asientos_dispo = ?,monto = ?,sector = ?,destino = ? WHERE id_viaje = ?', data).then(data2 => {
      this.buscarViajesIniciar(id_viaje);
      this.router.navigate(['/empviaje'])
    })
  }

  eliminarViajes(id_viaje) {

    return this.database.executeSql('DELETE FROM viaje WHERE id_viaje = ?', [id_viaje]).then(a => {
      this.buscarViajes();
      this.router.navigate(['/menu-p'])
    })

  }
  //------------------------------------------------------------------------------------

  loginUsuario(correo, clave) {
    let data = [correo, clave];
    return this.database.executeSql('SELECT correo FROM usuario WHERE correo = ? and clave = ?', data).then((res) => {
      let item2: Login[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          item2.push({
            correo: res.rows.item(i).correo
          });
        }
        this.listaLogin.next(item2);
        this.router.navigate(['/menu-p']);
        this.presentToast("has iniciado sesion correctamente");

      }
      else {
        this.presentToast("Usuario y/o clave incorrecta");
      }

    })

  }

  //---------perfil------------perfil------------perfil------------perfil---

  buscarUsuariosIniciar(corre) {
    let data = [corre];
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM usuario WHERE correo = ?', data).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Usuario[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            correo: res.rows.item(i).correo,
            puntos: res.rows.item(i).puntos,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            numero: res.rows.item(i).numero,
            clave: res.rows.item(i).clave,
            imagen: res.rows.item(i).imagen,
            idtipo: res.rows.item(i).idtipo,
            idtitulo: res.rows.item(i).idtitulo
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaUsuariosIniciar.next(items);
    })
  }

  listaUsuariosIniciar = new BehaviorSubject([]);
  fetchUsuariosIniciar(): Observable<Usuario[]> {
    return this.listaUsuariosIniciar.asObservable();
  }

  //----------------------Vehiculo-------------------------Vehiculo-------------------------Vehiculo-------------------------Vehiculo--------------

  buscarVehiculosIniciar(corre) {
    let data = [corre];
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM vehiculo INNER JOIN usuario on vehiculo.idusuario = usuario.id_usuario WHERE usuario.correo = ?', data).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Vehiculo[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_vehiculo: res.rows.item(i).id_vehiculo,
            patente: res.rows.item(i).patente,
            color: res.rows.item(i).color,
            modelo: res.rows.item(i).modelo,
            marca: res.rows.item(i).marca,
            idusuario: res.rows.item(i).idusuario
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaVehiculosIniciar.next(items);
    })
  }

  listaVehiculosIniciar = new BehaviorSubject([]);
  fetchVehiculosIniciar(): Observable<Vehiculo[]> {
    return this.listaVehiculosIniciar.asObservable();
  }

  //----------viajes------------viajes------------viajes------------viajes------------viajes------------viajes---

  buscarViajesIniciar(idvi) {
    let data = [idvi];
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM viaje WHERE id_viaje = ?', data).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Viaje[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_viaje: res.rows.item(i).id_viaje,
            hora_salida: res.rows.item(i).hora_salida,
            asientos_dispo: res.rows.item(i).asientos_dispo,
            asientos_ocupa: res.rows.item(i).asientos_ocupa,
            monto: res.rows.item(i).monto,
            sector: res.rows.item(i).sector,
            destino: res.rows.item(i).destino,
            idvehiculo: res.rows.item(i).id_vehiculo
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaViajesIniciar.next(items);
    })
  }

  listaViajesIniciar = new BehaviorSubject([]);
  fetchViajesIniciar(): Observable<Viaje[]> {
    return this.listaViajesIniciar.asObservable();
  }




  buscarUsuariosViaje(idvi) {
    let data = [idvi];
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM usuario INNER JOIN vehiculo on usuario.id_usuario = vehiculo.idusuario INNER JOIN viaje on vehiculo.id_vehiculo = viaje.idvehiculo WHERE viaje.id_viaje = ?', data).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Usuario[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            correo: res.rows.item(i).correo,
            puntos: res.rows.item(i).puntos,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            numero: res.rows.item(i).numero,
            clave: res.rows.item(i).clave,
            imagen: res.rows.item(i).imagen,
            idtipo: res.rows.item(i).idtipo,
            idtitulo: res.rows.item(i).idtitulo
          })
        }
      }

      //actualizamos el observable de las noticias
      this.listaUsuariosViaje.next(items);
    })
  }



  listaUsuariosViaje = new BehaviorSubject([]);
  fetchUsuariosViaje(): Observable<Usuario[]> {
    return this.listaUsuariosViaje.asObservable();
  }

  buscarVehiculosViaje(idvi) {
    let data = [idvi];
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM vehiculo INNER JOIN viaje on vehiculo.id_vehiculo = viaje.idvehiculo WHERE viaje.id_viaje = ? ', data).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Vehiculo[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_vehiculo: res.rows.item(i).id_vehiculo,
            patente: res.rows.item(i).patente,
            color: res.rows.item(i).color,
            modelo: res.rows.item(i).modelo,
            marca: res.rows.item(i).marca,
            idusuario: res.rows.item(i).idusuario
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaVehiculosViaje.next(items);
    })
  }

  listaVehiculosViaje = new BehaviorSubject([]);
  fetchVehiculosViaje(): Observable<Vehiculo[]> {
    return this.listaVehiculosViaje.asObservable();
  }

//-------------------------------------------------------------------------------------------------------------------------------------

agendarViaje(idviaje,idusuario){
  let data = [idviaje, idusuario];
    return this.database.executeSql('INSERT INTO detalleviaje(idviaje,idusuario) VALUES (?,?)', data).then(res => {
      this.buscarDetalleViaje();
    });
}




modificarViajeAsiento(idviaje) {
  let data = [idviaje];
  return this.database.executeSql('UPDATE viaje SET asientos_ocupa = asientos_ocupa + 1 WHERE id_viaje = ?', data).then(data2 => {
    this.buscarViajes();
  })
}

restarViajeAsiento(idviaje) {
  let data = [idviaje];
  return this.database.executeSql('UPDATE viaje SET asientos_ocupa = asientos_ocupa - 1 WHERE id_viaje = ?', data).then(data2 => {
    this.buscarViajes();
  })
}

buscarDetalleViaje() {
  //retorno la ejecución del select
  return this.database.executeSql('SELECT * FROM detalleviaje', []).then(res => {
    //creo mi lista de objetos de noticias vacio
    let items: Detalleviaje[] = [];
    //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id_detalle: res.rows.item(i).id_detalle,
          idviaje: res.rows.item(i).idviaje,
          idusuario: res.rows.item(i).idusuario
        })
      }

    }
    //actualizamos el observable de las noticias
    this.listaDetalleViajes.next(items);
  })
}

//------ViajePasajero----------ViajePasajero----------ViajePasajero----------ViajePasajero----------ViajePasajero----------ViajePasajero----

buscarDetalleViajeIniciar(iddetalle) {
  let data = [iddetalle];
  //retorno la ejecución del select
  return this.database.executeSql('SELECT * FROM detalleviaje WHERE id_detalle = ?', data).then(res => {
    //creo mi lista de objetos de noticias vacio
    let items: Detalleviaje[] = [];
    //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id_detalle: res.rows.item(i).id_detalle,
          idviaje: res.rows.item(i).idviaje,
          idusuario: res.rows.item(i).idusuario
        })
      }

    }
    //actualizamos el observable de las noticias
    this.listaDetalleViajeIniciar.next(items);
  })
}

listaDetalleViajeIniciar = new BehaviorSubject([]);
fetchDetalleViajeIniciar(): Observable<Detalleviaje[]> {
return this.listaDetalleViajeIniciar.asObservable();
}

eliminarViajePajasero(iddetalle){
  let data = [iddetalle]
  return this.database.executeSql('DELETE FROM detalleviaje WHERE id_detalle = ?',data).then(a=>{
    this.buscarDetalleViaje();
  })

}

eliminarViajeConductor(idviaje){
  let data = [idviaje]
  return this.database.executeSql('DELETE FROM viaje WHERE id_viaje = ?',data).then(a=>{
    this.buscarViajes();
  })

}

eliminarViajePasajeroConductor(idviaje){
  let data = [idviaje]
  return this.database.executeSql('DELETE FROM detalleviaje WHERE idviaje = ?',data).then(a=>{
    this.buscarDetalleViaje();
  })

}

buscarViajesIniciarPasajero(iddevi) {
  let data = [iddevi];
  //retorno la ejecución del select
  return this.database.executeSql('SELECT * FROM viaje INNER JOIN detalleviaje on viaje.id_viaje = detalleviaje.idviaje WHERE detalleviaje.id_detalle = ?', data).then(res => {
    //creo mi lista de objetos de noticias vacio
    let items: Viaje[] = [];
    //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id_viaje: res.rows.item(i).id_viaje,
          hora_salida: res.rows.item(i).hora_salida,
          asientos_dispo: res.rows.item(i).asientos_dispo,
          asientos_ocupa: res.rows.item(i).asientos_ocupa,
          monto: res.rows.item(i).monto,
          sector: res.rows.item(i).sector,
          destino: res.rows.item(i).destino,
          idvehiculo: res.rows.item(i).id_vehiculo
        })
      }

    }
    //actualizamos el observable de las noticias
    this.listaViajesIniciarPasajero.next(items);
  })
}

listaViajesIniciarPasajero = new BehaviorSubject([]);
fetchViajesIniciarPasajero(): Observable<Viaje[]> {
  return this.listaViajesIniciarPasajero.asObservable();
}




buscarUsuariosViajePasajero(idvi) {
  let data = [idvi];
  //retorno la ejecución del select
  return this.database.executeSql('SELECT * FROM usuario INNER JOIN detalleviaje on usuario.id_usuario = detalleviaje.idusuario WHERE detalleviaje.id_detalle = ?', data).then(res => {
    //creo mi lista de objetos de noticias vacio
    let items: Usuario[] = [];
    //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id_usuario: res.rows.item(i).id_usuario,
          correo: res.rows.item(i).correo,
          puntos: res.rows.item(i).puntos,
          nombre: res.rows.item(i).nombre,
          apellido: res.rows.item(i).apellido,
          numero: res.rows.item(i).numero,
          clave: res.rows.item(i).clave,
          imagen: res.rows.item(i).imagen,
          idtipo: res.rows.item(i).idtipo,
          idtitulo: res.rows.item(i).idtitulo
        })
      }
    }

    //actualizamos el observable de las noticias
    this.listaUsuariosViajePasajero.next(items);
  })
}



listaUsuariosViajePasajero = new BehaviorSubject([]);
fetchUsuariosViajePasajero(): Observable<Usuario[]> {
  return this.listaUsuariosViajePasajero.asObservable();
}

buscarVehiculosViajePasajero(idvi) {
  let data = [idvi];
  //retorno la ejecución del select
  return this.database.executeSql('SELECT * FROM vehiculo INNER JOIN viaje on vehiculo.id_vehiculo = viaje.idvehiculo INNER JOIN detalleviaje on viaje.id_viaje = detalleviaje.idviaje WHERE detalleviaje.id_detalle = ? ', data).then(res => {
    //creo mi lista de objetos de noticias vacio
    let items: Vehiculo[] = [];
    //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id_vehiculo: res.rows.item(i).id_vehiculo,
          patente: res.rows.item(i).patente,
          color: res.rows.item(i).color,
          modelo: res.rows.item(i).modelo,
          marca: res.rows.item(i).marca,
          idusuario: res.rows.item(i).idusuario
        })
      }

    }
    //actualizamos el observable de las noticias
    this.listaVehiculosViajePasajero.next(items);
  })
}

listaVehiculosViajePasajero = new BehaviorSubject([]);
fetchVehiculosViajePasajero(): Observable<Vehiculo[]> {
  return this.listaVehiculosViajePasajero.asObservable();
}

buscarTituloIniciar(correo) {
  let data = [correo];
  //retorno la ejecución del select
  return this.database.executeSql('SELECT * FROM titulo INNER JOIN usuario on titulo.id_titulo = usuario.idtitulo WHERE usuario.correo = ? ', data).then(res => {
    //creo mi lista de objetos de noticias vacio
    let items: Titulo[] = [];
    //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id_titulo: res.rows.item(i).id_titulo,
          nombret: res.rows.item(i).nombret,
          puntost: res.rows.item(i).puntost
        })
      }

    }
    //actualizamos el observable de las noticias
    this.listaTituloIniciar.next(items);
  })
}

listaTituloIniciar = new BehaviorSubject([]);
fetchTituloIniciar(): Observable<Titulo[]> {
  return this.listaTituloIniciar.asObservable();
}

sumarPuntos(idusuario,correo){
    let data = [idusuario];
    return this.database.executeSql('UPDATE usuario SET puntos = puntos + 1000 WHERE id_usuario = ?', data).then(data2 => {
      this.buscarUsuariosIniciar(correo);
    })
}

/////////////////////////////////////////////////////////


  iduser: string;
  nombre: string;
  clave: string;
  
  arrayUsers: any;

  bucardatos() {
    for (let x of this.arrayUsers) {
      this.iduser = x.id
      this.nombre = x.nombre
      this.clave = x.clave
    }
  }

  registroUsuarios(){
    for (let x of this.arrayUsers) {
      this.iduser = x.id
      this.nombre = x.nombre
      this.clave = x.clave
    }
  }


  ngOnInit() {
    this.bucardatos();
    this.Apirest.getUsers().subscribe(item => {
      this.arrayUsers = item;
    })
  }

/////////////////////////////////////////////////////////





}

