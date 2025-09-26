import { Routes } from '@angular/router';
import { Ingreso } from './ingreso/ingreso';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component:Ingreso
  },
  {
    path: 'Dashboard',
    component: Dashboard

  }
];
