import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <div class="flex h-screen items-center justify-center bg-gray-100">
      <div class="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
        <form (ngSubmit)="login()" class="space-y-4">
          <input [(ngModel)]="email" name="email" type="email" placeholder="Email" 
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input [(ngModel)]="password" name="password" type="password" placeholder="Password" 
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  password = '';

  login() {
    console.log(`Logging in with: ${this.email}, ${this.password}`);
  }
}
