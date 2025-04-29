import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h2>Welcome Back</h2>
          <p>Please sign in to continue</p>
        </div>
        
        <div class="form-group">
          <label for="username">Username</label>
          <div class="input-container">
            <i class="icon user-icon"></i>
            <input 
              id="username"
              [(ngModel)]="username" 
              placeholder="Enter your username"
              autocomplete="username"
              [disabled]="isLoading">
          </div>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-container">
            <i class="icon lock-icon"></i>
            <input 
              id="password"
              [(ngModel)]="password" 
              type="password" 
              placeholder="Enter your password"
              autocomplete="current-password"
              [disabled]="isLoading">
          </div>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>
        
        <div class="remember-me">
          <label class="checkbox-container">
            <input type="checkbox" [(ngModel)]="rememberMe">
            <span class="checkmark"></span>
            Remember me
          </label>
        </div>
        
        <button 
          class="login-button" 
          [class.loading]="isLoading"
          [disabled]="isLoading || !username || !password" 
          (click)="login()">
          <span *ngIf="!isLoading">Sign In</span>
          <span *ngIf="isLoading" class="spinner"></span>
        </button>
        
        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div class="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f7fa;
      padding: 20px;
    }
    
    .login-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 400px;
      padding: 35px 30px;
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .login-header h2 {
      margin: 0;
      color: #333;
      font-size: 24px;
      font-weight: 600;
    }
    
    .login-header p {
      margin-top: 8px;
      color: #666;
      font-size: 14px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 6px;
      font-size: 14px;
      font-weight: 500;
      color: #555;
    }
    
    .input-container {
      position: relative;
    }
    
    .icon {
      position: absolute;
      left: 12px;
      top: 12px;
      color: #aaa;
      width: 16px;
      height: 16px;
    }
    
    .user-icon:before {
      content: "👤";
    }
    
    .lock-icon:before {
      content: "🔒";
    }
    
    input {
      width: 100%;
      padding: 12px 12px 12px 40px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.3s;
      box-sizing: border-box;
    }
    
    input:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
    
    input:disabled {
      background-color: #f7f7f7;
      cursor: not-allowed;
    }
    
    .forgot-password {
      display: block;
      text-align: right;
      font-size: 12px;
      color: #4a90e2;
      margin-top: 8px;
      text-decoration: none;
    }
    
    .remember-me {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 14px;
      color: #555;
    }
    
    .checkbox-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    
    .checkmark {
      height: 18px;
      width: 18px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 3px;
      margin-right: 8px;
      display: inline-block;
      position: relative;
    }
    
    .checkbox-container input:checked ~ .checkmark {
      background-color: #4a90e2;
      border-color: #4a90e2;
    }
    
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    
    .checkbox-container input:checked ~ .checkmark:after {
      display: block;
      left: 6px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    
    .login-button {
      width: 100%;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 12px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .login-button:hover:not(:disabled) {
      background-color: #3a80d2;
    }
    
    .login-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .login-button.loading {
      position: relative;
      color: transparent;
    }
    
    .spinner {
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
      left: calc(50% - 10px);
      top: calc(50% - 10px);
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .error-message {
      color: #e53935;
      margin-top: 15px;
      font-size: 14px;
      text-align: center;
    }
    
    .signup-link {
      margin-top: 25px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    
    .signup-link a {
      color: #4a90e2;
      text-decoration: none;
      font-weight: 500;
    }
    
    .signup-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  rememberMe = false;
  isLoading = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.http.post('http://localhost:3000/api/auth/login', {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    }).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        if (this.rememberMe) {
          localStorage.setItem('username', this.username);
        }
        this.router.navigate(['/']);
      },
      error => {
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'Login failed. Please try again later.';
        }
      }
    );
  }
}