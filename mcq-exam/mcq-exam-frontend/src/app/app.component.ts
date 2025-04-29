import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-blue-600 p-4 text-white flex justify-center space-x-6">
        <a routerLink="/dashboard" class="hover:underline">Dashboard</a>
        <a routerLink="/question-bank" class="hover:underline">Question Bank</a>
        <a routerLink="/attempt-exam" class="hover:underline">Attempt Exam</a>
      </nav>

      <div class="p-6">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {}
