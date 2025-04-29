import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .page-title {
      color: #2c3e50;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .department-list {
      list-style: none;
      padding: 0;
    }
    .department-card {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .department-info {
      flex: 1;
    }
    .department-name {
      font-weight: bold;
      font-size: 18px;
      color: #2c3e50;
    }
    .department-building {
      color: #7f8c8d;
      margin-top: 5px;
    }
    .department-budget {
      color: #16a085;
      font-weight: bold;
    }
    .action-buttons {
      display: flex;
      gap: 10px;
    }
    .btn {
      padding: 8px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .btn-delete {
      background-color: #e74c3c;
      color: white;
    }
    .btn-delete:hover {
      background-color: #c0392b;
    }
    .btn-submit {
      background-color: #2ecc71;
      color: white;
    }
    .btn-submit:hover {
      background-color: #27ae60;
    }
    .form-section {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin-top: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-title {
      color: #2c3e50;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;
    }
    .form-row {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
      flex-wrap: wrap;
    }
    .form-group {
      flex: 1;
      min-width: 200px;
    }
    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    .form-control:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52,152,219,0.2);
    }
    .empty-state {
      text-align: center;
      color: #7f8c8d;
      padding: 30px;
    }
    .loading-spinner {
      text-align: center;
      padding: 20px;
      color: #3498db;
    }
    .error-message {
      color: #e74c3c;
      background-color: #fadbd8;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 15px;
    }
  `],
  template: `
    <div class="container">
      <h1 class="page-title">Departments Management</h1>
      
      <!-- Loading state -->
      <div *ngIf="loading" class="loading-spinner">
        Loading departments...
      </div>
      
      <!-- Error state -->
      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>

      <!-- Department list -->
      <div *ngIf="!loading">
        <ul class="department-list">
          <li *ngIf="departments.length === 0" class="empty-state">
            No departments found. Add your first department below.
          </li>
          <li *ngFor="let department of departments" class="department-card">
            <div class="department-info">
              <div class="department-name">{{ department.dept_name }}</div>
              <div class="department-building">Building: {{ department.building }}</div>
              <div class="department-budget">Budget: {{ department.budget | currency }}</div>
            </div>
            <div class="action-buttons">
              <button class="btn btn-delete" (click)="confirmDelete(department)">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Add Department Form -->  
      <div class="form-section">
        <h3 class="form-title">Add New Department</h3>
        <form (ngSubmit)="addDepartment()">
          <div class="form-row">
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newDepartment.dept_name" name="dept_name" placeholder="Department Name" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newDepartment.building" name="building" placeholder="Building" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newDepartment.budget" name="budget" placeholder="Budget" type="number" min="0" required />
            </div>
          </div>
          <button class="btn btn-submit" type="submit" [disabled]="!isValidDepartment(newDepartment)">Add Department</button>
        </form>
      </div>
    </div>
  `
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  newDepartment = { dept_name: '', building: '', budget: null };
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  // Load all departments
  loadDepartments() {
    this.loading = true;
    this.error = '';
    
    this.http.get<any[]>('http://localhost:3000/api/departments')
      .subscribe(
        departments => {
          this.departments = departments;
          this.loading = false;
        },
        error => {
          console.error('Error loading departments:', error);
          this.error = 'Failed to load departments. Please try again later.';
          this.loading = false;
        }
      );
  }

  // Add new department
  addDepartment() {
    if (!this.isValidDepartment(this.newDepartment)) return;
    
    this.loading = true;
    this.http.post('http://localhost:3000/api/departments', this.newDepartment)
      .subscribe(
        () => {
          this.loadDepartments();
          this.newDepartment = { dept_name: '', building: '', budget: null }; // Reset form
        },
        error => {
          console.error('Error adding department:', error);
          this.error = 'Failed to add department. Please try again.';
          this.loading = false;
        }
      );
  }

  // Confirm before deleting
  confirmDelete(department: any) {
    if (confirm(`Are you sure you want to delete the ${department.dept_name} department?`)) {
      this.deleteDepartment(department.dept_name);
    }
  }

  // Delete a department
  deleteDepartment(deptName: string) {
    this.loading = true;
    this.http.delete(`http://localhost:3000/api/departments/${deptName}`)
      .subscribe(
        () => {
          this.loadDepartments();
        },
        error => {
          console.error('Error deleting department:', error);
          this.error = 'Failed to delete department. Please try again.';
          this.loading = false;
        }
      );
  }

  // Validate department data
  isValidDepartment(department: any): boolean {
    return !!department.dept_name && !!department.building && department.budget !== null && department.budget !== '';
  }
}