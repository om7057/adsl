import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="app-container">
      <header>
        <h1>{{ title }}</h1>
      </header>
      <nav>
        <a routerLink="/" class="nav-item">Home</a>
        <a routerLink="/students" class="nav-item">Students</a>
        <a routerLink="/departments" class="nav-item">Departments</a>
        <a routerLink="/courses" class="nav-item">Courses</a>
        <a routerLink="/instructors" class="nav-item">Instructors</a>
        <a routerLink="/sections" class="nav-item">Sections</a>
        <a routerLink="/takes" class="nav-item">Takes</a>
        <a routerLink="/teaches" class="nav-item">Teaches</a>
        <a routerLink="/login" class="nav-item">Login</a>
        <a routerLink="/user-management" class="nav-item">User Management</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    /* General container for alignment */
    .app-container {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    /* Header style */
    header h1 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 20px;
      color: #4A90E2;
    }

    /* Navigation bar styles */
    nav {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    /* Navigation item styles */
    .nav-item {
      text-decoration: none;
      color: #333;
      font-size: 1.2rem;
      padding: 10px 20px;
      border-radius: 5px;
      transition: background-color 0.3s, color 0.3s;
    }

    .nav-item:hover {
      background-color: #4A90E2;
      color: white;
    }

    /* Responsive design for smaller screens */
    @media (max-width: 768px) {
      nav {
        flex-direction: column;
        align-items: center;
      }

      .nav-item {
        font-size: 1.5rem;
        margin: 5px 0;
      }
    }
  `]
})
export class AppComponent {
  title = 'Student Management Information System';
}
