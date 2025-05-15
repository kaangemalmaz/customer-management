import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'customer',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/customers/customers.component').then((m) => m.CustomersComponent),
  },
  {
    path: 'password-change',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/password-change/password-change.component').then((m) => m.PasswordChangeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/customers/customers.component').then((m) => m.CustomersComponent),
  },
];
