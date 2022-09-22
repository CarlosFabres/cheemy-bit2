import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'menu-p',
    loadChildren: () => import('./pages/menu-p/menu-p.module').then( m => m.MenuPPageModule)
  },
  {
    path: 'registrar-v',
    loadChildren: () => import('./pages/registrar-v/registrar-v.module').then( m => m.RegistrarVPageModule)
  },
  {
    path: 'viajes',
    loadChildren: () => import('./pages/viajes/viajes.module').then( m => m.ViajesPageModule)
  },
  {
    path: 'dato-v',
    loadChildren: () => import('./pages/dato-v/dato-v.module').then( m => m.DatoVPageModule)
  },
  {
    path: 'cviajes',
    loadChildren: () => import('./pages/cviajes/cviajes.module').then( m => m.CviajesPageModule)
  },
  {
    path: 'empviaje',
    loadChildren: () => import('./pages/empviaje/empviaje.module').then( m => m.EmpviajePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'viajeemp',
    loadChildren: () => import('./pages/viajeemp/viajeemp.module').then( m => m.ViajeempPageModule)
  },
  {
    path: 'recup-contra',
    loadChildren: () => import('./pages/recup-contra/recup-contra.module').then( m => m.RecupContraPageModule)
  },
  {
    path: 'recup-contra2',
    loadChildren: () => import('./pages/recup-contra2/recup-contra2.module').then( m => m.RecupContra2PageModule)
  },
  {
    path: 'modi-viaje',
    loadChildren: () => import('./pages/modi-viaje/modi-viaje.module').then( m => m.ModiViajePageModule)
  },
  {
    path: 'v-agendar',
    loadChildren: () => import('./pages/v-agendar/v-agendar.module').then( m => m.VAgendarPageModule)
  },
  {
    path: 'modi-cuenta',
    loadChildren: () => import('./pages/modi-cuenta/modi-cuenta.module').then( m => m.ModiCuentaPageModule)
  },
  {
    path: 'modi-vehiculo',
    loadChildren: () => import('./pages/modi-vehiculo/modi-vehiculo.module').then( m => m.ModiVehiculoPageModule)
  },
  {
    path: 'vehiculo',
    loadChildren: () => import('./pages/vehiculo/vehiculo.module').then( m => m.VehiculoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
