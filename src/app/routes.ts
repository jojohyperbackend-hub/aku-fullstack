import { Routes } from '@angular/router';
import IndexPage from './pages/index.page';
import AuthPage from './pages/auth.page';

// Guard function untuk mengecek login
function authGuard(): boolean {
  const loggedIn = localStorage.getItem('auth') === 'true';
  return loggedIn;
}

export const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    // Redirect ke /auth jika belum login
    canActivate: [() => {
      if (!authGuard()) {
        location.href = '/auth';
        return false;
      }
      return true;
    }],
  },
  {
    path: 'auth',
    component: AuthPage,
    // Jika sudah login, jangan bisa ke /auth lagi
    canActivate: [() => {
      if (authGuard()) {
        location.href = '/';
        return false;
      }
      return true;
    }],
  },
  // Fallback route
  {
    path: '**',
    redirectTo: '',
  },
];
