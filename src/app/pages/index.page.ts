import { Component } from '@angular/core';
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
    <div class="index-container">
      <h1>Admin Dashboard</h1>
      <button class="logout-btn" (click)="logout()">Logout</button>

      <h2>Add Item</h2>
      <form (submit)="addItem($event)">
        <input type="text" placeholder="Item name" [(ngModel)]="newItem.name" name="name" required>
        <input type="number" placeholder="Price" [(ngModel)]="newItem.price" name="price" required>
        <input type="number" placeholder="Stock" [(ngModel)]="newItem.stock" name="stock" required>
        <button type="submit">Add</button>
      </form>

      <h2>Items</h2>
      <table border="1" cellpadding="8">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
        <tr *ngFor="let item of items">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.stock }}</td>
          <td>
            <button (click)="editItem(item)">Edit</button>
            <button (click)="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </table>

      <p class="error" *ngIf="error">{{ error }}</p>

      <style>
        .index-container {
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          text-align: center;
        }
        input {
          margin: 5px;
          padding: 5px;
        }
        button {
          margin: 5px;
          padding: 5px 10px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }
        .logout-btn {
          background: #e74c3c;
          color: white;
        }
        table {
          width: 100%;
          margin-top: 20px;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          text-align: center;
        }
        .error {
          color: red;
          margin-top: 10px;
        }
      </style>
    </div>
  `,
})
export default class IndexPage {
  items: Item[] = [];
  newItem: Partial<Item> = { name: '', price: 0, stock: 0 };
  error = '';
  private idCounter = 1;

  logout() {
    localStorage.removeItem('auth');
    location.href = '/auth';
  }

  addItem(event: Event) {
    event.preventDefault();
    if (!this.newItem.name || this.newItem.price == null || this.newItem.stock == null) {
      this.error = 'Please fill all fields';
      return;
    }

    this.items.push({
      id: this.idCounter++,
      name: this.newItem.name,
      price: this.newItem.price,
      stock: this.newItem.stock,
    });

    this.newItem = { name: '', price: 0, stock: 0 };
    this.error = '';
  }

  deleteItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  editItem(item: Item) {
    const name = prompt('Edit name:', item.name);
    const price = prompt('Edit price:', item.price.toString());
    const stock = prompt('Edit stock:', item.stock.toString());
    if (name !== null && price !== null && stock !== null) {
      item.name = name;
      item.price = Number(price);
      item.stock = Number(stock);
    }
  }
}
