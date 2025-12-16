import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <h1>Admin Login</h1>
      <form (submit)="login($event)">
        <input
          type="text"
          placeholder="Username"
          [(ngModel)]="username"
          name="username"
          required
        >
        <input
          type="password"
          placeholder="Password"
          [(ngModel)]="password"
          name="password"
          required
        >
        <button type="submit">Login</button>
      </form>
      <p class="error" *ngIf="error">{{ error }}</p>

      <style>
        .auth-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-family: Arial, sans-serif;
          text-align: center;
        }
        input {
          width: 80%;
          padding: 8px;
          margin: 10px 0;
          border-radius: 4px;
          border: 1px solid #aaa;
        }
        button {
          padding: 8px 16px;
          border: none;
          background: #3498db;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .error {
          color: red;
          margin-top: 10px;
        }
      </style>
    </div>
  `,
})
export default class AuthPage {
  username = '';
  password = '';
  error = '';

  login(event: Event) {
    event.preventDefault();

    const ADMIN_USERNAME = import.meta.env['VITE_ADMIN_USERNAME'];
    const ADMIN_PASSWORD = import.meta.env['VITE_ADMIN_PASSWORD'];

    if (this.username === ADMIN_USERNAME && this.password === ADMIN_PASSWORD) {
      localStorage.setItem('username', this.username);
      location.href = '/';
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
