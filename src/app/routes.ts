import { Routes } from '@angular/router';
import IndexPage from './pages/index.page';
import AuthPage from './pages/auth.page';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // root redirect ke auth
  { path: 'auth', component: AuthPage },              // halaman login
  { path: 'index', component: IndexPage },            // halaman utama setelah login
];
