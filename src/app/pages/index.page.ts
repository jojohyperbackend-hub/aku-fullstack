import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type Item = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Items Dashboard</h1>
      <button class="logout" (click)="logout()">Log Out</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items()">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.stock }}</td>
            <td>
              <button class="delete-btn" (click)="deleteItem(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Add Item</h2>
      <form (submit)="addItem($event)">
        <input type="text" placeholder="Name" [(ngModel)]="newItem.name" name="name" required>
        <input type="number" placeholder="Price" [(ngModel)]="newItem.price" name="price" required>
        <input type="number" placeholder="Stock" [(ngModel)]="newItem.stock" name="stock" required>
        <button type="submit">Add</button>
      </form>

      <style>
        .container {
          max-width: 600px;
          margin: 20px auto;
          font-family: Arial, sans-serif;
        }
        h1 {
          text-align: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #444;
          padding: 8px;
          text-align: left;
        }
        th {
          background: #eee;
        }
        input {
          margin-right: 8px;
          padding: 6px;
        }
        button {
          padding: 6px 12px;
          cursor: pointer;
        }
        .delete-btn {
          background: #e74c3c;
          color: white;
          border: none;
        }
        .logout {
          float: right;
          background: #3498db;
          color: white;
          border: none;
          margin-bottom: 10px;
        }
        form {
          margin-top: 10px;
        }
      </style>
    </div>
  `,
})
export default class IndexPage implements OnInit {
  items = signal<Item[]>([]);
  newItem: Partial<Item> = { name: '', price: 0, stock: 0 };

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    fetch('/api/v1/das?action=list', {
      headers: { 'x-user': localStorage.getItem('username') || '' },
    })
      .then(res => res.json())
      .then(data => this.items.set(data))
      .catch(() => this.items.set([]));
  }

  addItem(event: Event) {
    event.preventDefault();
    fetch('/api/v1/das?action=add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user': localStorage.getItem('username') || '',
      },
      body: JSON.stringify(this.newItem),
    })
      .then(res => res.json())
      .then(data => {
        this.items.set(data);
        this.newItem = { name: '', price: 0, stock: 0 };
      });
  }

  deleteItem(id: number) {
    fetch('/api/v1/das?action=delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user': localStorage.getItem('username') || '',
      },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data => this.items.set(data));
  }

  logout() {
    localStorage.removeItem('username');
    location.href = '/auth';
  }
}
