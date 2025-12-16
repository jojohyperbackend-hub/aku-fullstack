import { Routes } from '@angular/router';
import IndexPage from './pages/index.page';
import AuthPage from './pages/auth.page';

export const routes: Routes = [
  { path: '', component: IndexPage },
  { path: 'auth', component: AuthPage },
];
