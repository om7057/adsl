import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-management-container">
      <div class="page-header">
        <h1>User Management</h1>
        <p>Manage system users and permissions</p>
      </div>
      
      <div class="dashboard-layout">
        <!-- User List Panel -->
        <div class="panel users-panel">
          <div class="panel-header">
            <h2>Users</h2>
            <div class="search-container">
              <input 
                [(ngModel)]="searchQuery" 
                placeholder="Search users..." 
                (input)="filterUsers()"
                class="search-input">
              <span class="search-icon">🔍</span>
            </div>
          </div>
          
          <div class="panel-content">
            <div *ngIf="isLoading" class="loading-indicator">
              <div class="spinner"></div>
              <span>Loading users...</span>
            </div>
            
            <div *ngIf="!isLoading && filteredUsers.length === 0" class="empty-state">
              <div class="empty-icon">👥</div>
              <p *ngIf="searchQuery">No users match your search criteria</p>
              <p *ngIf="!searchQuery">No users found in the system</p>
              <button *ngIf="!searchQuery" class="btn btn-primary" (click)="showAddUserForm = true">Add Your First User</button>
            </div>
            
            <table *ngIf="!isLoading && filteredUsers.length > 0" class="users-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let user of filteredUsers" [class.selected]="selectedUser?.id === user.id">
                  <td>
                    <div class="user-info">
                      <div class="avatar">{{user.username.charAt(0).toUpperCase()}}</div>
                      <span>{{user.username}}</span>
                    </div>
                  </td>
                  <td>
                    <span class="role-badge" [ngClass]="getRoleBadgeClass(user.role)">
                      {{user.role}}
                    </span>
                  </td>
                  <td>
                    <span class="status-indicator" [class.active]="user.active">
                      {{user.active ? 'Active' : 'Inactive'}}
                    </span>
                  </td>
                  <td class="actions-cell">
                    <button class="btn-icon edit" (click)="selectUser(user)" title="Edit User">
                      ✏️
                    </button>
                    <button class="btn-icon delete" (click)="confirmDeleteUser(user)" title="Delete User">
                      🗑️
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- User Form Panel -->
        <div class="panel user-form-panel" *ngIf="showAddUserForm || selectedUser">
          <div class="panel-header">
            <h2>{{ selectedUser ? 'Edit User' : 'Add New User' }}</h2>
            <button class="btn-icon close" (click)="cancelEdit()" title="Close">✖</button>
          </div>
          
          <div class="panel-content">
            <form (submit)="$event.preventDefault(); selectedUser ? updateUser() : addUser()">
              <div class="form-group">
                <label for="username">Username</label>
                <input 
                  id="username"
                  [(ngModel)]="userForm.username" 
                  name="username"
                  placeholder="Enter username"
                  required>
                <p *ngIf="formErrors.username" class="error-text">{{formErrors.username}}</p>
              </div>
              
              <div class="form-group" *ngIf="!selectedUser">
                <label for="password">Password</label>
                <div class="password-container">
                  <input 
                    id="password"
                    [(ngModel)]="userForm.password" 
                    name="password"
                    [type]="showPassword ? 'text' : 'password'"
                    placeholder="Enter password"
                    required>
                  <button 
                    type="button" 
                    class="password-toggle" 
                    (click)="showPassword = !showPassword">
                    {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                  </button>
                </div>
                <p *ngIf="formErrors.password" class="error-text">{{formErrors.password}}</p>
              </div>
              
              <div class="form-group">
                <label for="role">Role</label>
                <select 
                  id="role"
                  [(ngModel)]="userForm.role" 
                  name="role"
                  required>
                  <option value="" disabled selected>Select role</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="user">User</option>
                </select>
                <p *ngIf="formErrors.role" class="error-text">{{formErrors.role}}</p>
              </div>
              
              <div class="form-group form-checkbox">
                <label class="checkbox-container">
                  <input 
                    type="checkbox" 
                    [(ngModel)]="userForm.active" 
                    name="active">
                  <span class="checkmark"></span>
                  Active Account
                </label>
              </div>
              
              <div class="form-actions">
                <button 
                  type="button" 
                  class="btn btn-secondary" 
                  (click)="cancelEdit()">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  [disabled]="isSubmitting">
                  <span *ngIf="!isSubmitting">{{ selectedUser ? 'Update User' : 'Add User' }}</span>
                  <span *ngIf="isSubmitting" class="spinner small"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Delete Confirmation Modal -->
      <div class="modal-overlay" *ngIf="showDeleteModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Confirm Delete</h3>
            <button class="btn-icon close" (click)="showDeleteModal = false">✖</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <strong>{{userToDelete?.username}}</strong>?</p>
            <p class="text-warning">This action cannot be undone.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" (click)="showDeleteModal = false">Cancel</button>
            <button 
              class="btn btn-danger" 
              [disabled]="isDeleting"
              (click)="deleteUser(userToDelete?.id)">
              <span *ngIf="!isDeleting">Delete</span>
              <span *ngIf="isDeleting" class="spinner small white"></span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Toast Notifications -->
      <div class="toast-container" *ngIf="toast.show">
        <div class="toast" [ngClass]="toast.type">
          <div class="toast-icon">
            <span *ngIf="toast.type === 'success'">✅</span>
            <span *ngIf="toast.type === 'error'">❌</span>
            <span *ngIf="toast.type === 'info'">ℹ️</span>
          </div>
          <div class="toast-message">{{toast.message}}</div>
          <button class="toast-close" (click)="toast.show = false">✖</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-management-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px;
      color: #333;
      position: relative;
    }
    
    .page-header {
      margin-bottom: 24px;
    }
    
    .page-header h1 {
      margin: 0;
      font-weight: 600;
      font-size: 28px;
      color: #2c3e50;
    }
    
    .page-header p {
      margin-top: 8px;
      color: #7f8c8d;
      font-size: 16px;
    }
    
    .dashboard-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    @media (min-width: 992px) {
      .dashboard-layout {
        grid-template-columns: 3fr 2fr;
      }
    }
    
    .panel {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    
    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
    }
    
    .panel-header h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }
    
    .panel-content {
      padding: 20px;
    }
    
    /* Search */
    .search-container {
      position: relative;
      width: 240px;
    }
    
    .search-input {
      width: 100%;
      padding: 8px 12px 8px 36px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      transition: all 0.2s ease;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
    }
    
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #aaa;
      font-size: 14px;
    }
    
    /* Table */
    .users-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .users-table th, 
    .users-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
    }
    
    .users-table th {
      font-weight: 600;
      color: #5c6570;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .users-table tr:hover td {
      background-color: #f8f9fa;
    }
    
    .users-table tr.selected td {
      background-color: rgba(52, 152, 219, 0.1);
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .avatar {
      width: 36px;
      height: 36px;
      background-color: #3498db;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }
    
    .role-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
    }
    
    .role-admin {
      background-color: rgba(231, 76, 60, 0.15);
      color: #c0392b;
    }
    
    .role-editor {
      background-color: rgba(46, 204, 113, 0.15);
      color: #27ae60;
    }
    
    .role-user {
      background-color: rgba(52, 152, 219, 0.15);
      color: #2980b9;
    }
    
    .status-indicator {
      display: inline-flex;
      align-items: center;
      font-size: 13px;
      color: #7f8c8d;
    }
    
    .status-indicator::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #95a5a6;
      margin-right: 6px;
    }
    
    .status-indicator.active {
      color: #27ae60;
    }
    
    .status-indicator.active::before {
      background-color: #2ecc71;
    }
    
    .actions-cell {
      white-space: nowrap;
    }
    
    .btn-icon {
      background: none;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      cursor: pointer;
      opacity: 0.8;
      transition: all 0.2s ease;
    }
    
    .btn-icon:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    .btn-icon.edit:hover {
      background-color: rgba(52, 152, 219, 0.1);
    }
    
    .btn-icon.delete:hover {
      background-color: rgba(231, 76, 60, 0.1);
    }
    
    .btn-icon.close {
      font-size: 14px;
      color: #7f8c8d;
      padding: 0;
    }
    
    /* Form */
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      font-size: 14px;
      color: #34495e;
    }
    
    .form-group input,
    .form-group select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
    }
    
    .password-container {
      position: relative;
    }
    
    .password-toggle {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: #7f8c8d;
    }
    
    .error-text {
      color: #e74c3c;
      font-size: 12px;
      margin-top: 5px;
    }
    
    .form-checkbox {
      display: flex;
      align-items: center;
    }
    
    .checkbox-container {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 30px;
      cursor: pointer;
      user-select: none;
    }
    
    .checkbox-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      width: auto;
    }
    
    .checkmark {
      position: absolute;
      left: 0;
      height: 20px;
      width: 20px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 3px;
    }
    
    .checkbox-container:hover input ~ .checkmark {
      border-color: #ccc;
    }
    
    .checkbox-container input:checked ~ .checkmark {
      background-color: #3498db;
      border-color: #3498db;
    }
    
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    
    .checkbox-container input:checked ~ .checkmark:after {
      display: block;
      left: 7px;
      top: 3px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 24px;
    }
    
    .btn {
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
    }
    
    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .btn-primary {
      background-color: #3498db;
      color: #fff;
    }
    
    .btn-primary:hover:not(:disabled) {
      background-color: #2980b9;
    }
    
    .btn-secondary {
      background-color: #ecf0f1;
      color: #2c3e50;
    }
    
    .btn-secondary:hover:not(:disabled) {
      background-color: #dde4e6;
    }
    
    .btn-danger {
      background-color: #e74c3c;
      color: #fff;
    }
    
    .btn-danger:hover:not(:disabled) {
      background-color: #c0392b;
    }
    
    /* Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }
    
    .modal-content {
      background-color: #fff;
      border-radius: 8px;
      width: 400px;
      max-width: 90%;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      overflow: hidden;
    }
    
    .modal-header {
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e9ecef;
    }
    
    .modal-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }
    
    .modal-body {
      padding: 20px;
    }
    
    .modal-body p {
      margin: 0 0 10px 0;
    }
    
    .text-warning {
      color: #e74c3c;
      font-size: 13px;
    }
    
    .modal-footer {
      padding: 16px 20px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      border-top: 1px solid #e9ecef;
    }
    
    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 40px 20px;
    }
    
    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
      color: #bdc3c7;
    }
    
    .empty-state p {
      color: #7f8c8d;
      margin-bottom: 20px;
    }
    
    /* Loading */
    .loading-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 0;
      color: #7f8c8d;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      border-top-color: #3498db;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    
    .spinner.small {
      width: 16px;
      height: 16px;
      border-width: 2px;
      margin: 0;
    }
    
    .spinner.white {
      border-color: rgba(255, 255, 255, 0.3);
      border-top-color: #fff;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Toast */
    .toast-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 100;
    }
    
    .toast {
      display: flex;
      align-items: center;
      padding: 14px 18px;
      border-radius: 6px;
      background-color: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
      margin-top: 10px;
      min-width: 300px;
      animation: slideIn 0.3s ease forwards;
    }
    
    .toast.success {
      border-left: 4px solid #2ecc71;
    }
    
    .toast.error {
      border-left: 4px solid #e74c3c;
    }
    
    .toast.info {
      border-left: 4px solid #3498db;
    }
    
    .toast-icon {
      margin-right: 12px;
    }
    
    .toast-message {
      flex: 1;
    }
    
    .toast-close {
      background: none;
      border: none;
      color: #bdc3c7;
      cursor: pointer;
      padding: 4px;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class UserManagementComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery = '';
  
  showAddUserForm = false;
  selectedUser: any = null;
  userToDelete: any = null;
  
  isLoading = false;
  isSubmitting = false;
  isDeleting = false;
  showDeleteModal = false;
  showPassword = false;
  
  userForm = {
    username: '',
    password: '',
    role: '',
    active: true
  };
  
  formErrors = {
    username: '',
    password: '',
    role: ''
  };
  
  toast = {
    show: false,
    message: '',
    type: 'info',
    timeout: null as any
  };

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.http.get('http://localhost:3000/api/users')
      .subscribe(
        (users: any) => {
          this.users = users.map((user: any) => ({
            ...user,
            active: user.active !== undefined ? user.active : true // Default to active if not specified
          }));
          this.filteredUsers = [...this.users];
          this.isLoading = false;
        },
        error => {
          this.showToast('Failed to load users. Please try again.', 'error');
          this.isLoading = false;
        }
      );
  }

  filterUsers() {
    if (!this.searchQuery) {
      this.filteredUsers = [...this.users];
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.username.toLowerCase().includes(query) || 
      user.role.toLowerCase().includes(query)
    );
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.userForm = {
      username: user.username,
      password: '', // Don't include password when editing
      role: user.role,
      active: user.active !== undefined ? user.active : true
    };
    this.showAddUserForm = true;
    this.resetFormErrors();
  }

  cancelEdit() {
    this.selectedUser = null;
    this.showAddUserForm = false;
    this.resetForm();
  }

  resetForm() {
    this.userForm = {
      username: '',
      password: '',
      role: '',
      active: true
    };
    this.resetFormErrors();
  }

  resetFormErrors() {
    this.formErrors = {
      username: '',
      password: '',
      role: ''
    };
  }

  validateForm(): boolean {
    let isValid = true;
    this.resetFormErrors();
    
    if (!this.userForm.username.trim()) {
      this.formErrors.username = 'Username is required';
      isValid = false;
    }
    
    if (!this.selectedUser && !this.userForm.password.trim()) {
      this.formErrors.password = 'Password is required for new users';
      isValid = false;
    }
    
    if (!this.userForm.role) {
      this.formErrors.role = 'Please select a role';
      isValid = false;
    }
    
    return isValid;
  }

  addUser() {
    if (!this.validateForm()) return;
    
    this.isSubmitting = true;
    this.http.post('http://localhost:3000/api/users', {
      username: this.userForm.username,
      password: this.userForm.password,
      role: this.userForm.role,
      active: this.userForm.active
    }).subscribe(
      () => {
        this.loadUsers();
        this.resetForm();
        this.showAddUserForm = false;
        this.showToast('User added successfully!', 'success');
        this.isSubmitting = false;
      },
      error => {
        this.showToast('Failed to add user. Please try again.', 'error');
        this.isSubmitting = false;
      }
    );
  }

  updateUser() {
    if (!this.validateForm()) return;
    
    this.isSubmitting = true;
    const updateData = {
      username: this.userForm.username,
      role: this.userForm.role,
      active: this.userForm.active
    };
    
    // Only include password if it was entered
    if (this.userForm.password.trim()) {
      Object.assign(updateData, { password: this.userForm.password });
    }
    
    this.http.put(`http://localhost:3000/api/users/${this.selectedUser.id}`, updateData)
      .subscribe(
        () => {
          this.loadUsers();
          this.selectedUser = null;
          this.showAddUserForm = false;
          this.showToast('User updated successfully!', 'success');
          this.isSubmitting = false;
        },
        error => {
          this.showToast('Failed to update user. Please try again.', 'error');
          this.isSubmitting = false;
        }
      );
  }

  confirmDeleteUser(user: any) {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  deleteUser(id: number) {
    if (!id) return;
    
    this.isDeleting = true;
    this.http.delete(`http://localhost:3000/api/users/${id}`)
      .subscribe(
        () => {
          this.loadUsers();
          this.showDeleteModal = false;
          this.userToDelete = null;
          this.showToast('User deleted successfully!', 'success');
          this.isDeleting = false;
        },
        error => {
          this.showToast('Failed to delete user. Please try again.', 'error');
          this.isDeleting = false;
        }
      );
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    // Clear existing timeout
    if (this.toast.timeout) {
      clearTimeout(this.toast.timeout);
    }
    
    // Show new toast
    this.toast = {
      show: true,
      message,
      type,
      timeout: setTimeout(() => {
        this.toast.show = false;
      }, 4000)
    };
  }
  
  getRoleBadgeClass(role: string): string {
    const roleLower = role.toLowerCase();
    
    if (roleLower === 'admin') return 'role-admin';
    if (roleLower === 'editor') return 'role-editor';
    return 'role-user'; // default for any other role
  }
}