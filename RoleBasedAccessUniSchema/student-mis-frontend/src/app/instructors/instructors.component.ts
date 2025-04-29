import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instructors',
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
    .instructor-list {
      list-style: none;
      padding: 0;
    }
    .instructor-card {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .instructor-info {
      flex: 1;
    }
    .instructor-name {
      font-weight: bold;
      font-size: 18px;
      color: #2c3e50;
    }
    .instructor-dept {
      color: #7f8c8d;
      margin-top: 5px;
    }
    .instructor-salary {
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
    .btn-update {
      background-color: #3498db;
      color: white;
    }
    .btn-update:hover {
      background-color: #2980b9;
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
      <h1 class="page-title">Instructors Management</h1>
      
      <!-- Loading state -->
      <div *ngIf="loading" class="loading-spinner">
        Loading instructors...
      </div>
      
      <!-- Error state -->
      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>

      <!-- Instructor list -->
      <div *ngIf="!loading">
        <ul class="instructor-list">
          <li *ngIf="instructors.length === 0" class="empty-state">
            No instructors found. Add your first instructor below.
          </li>
          <li *ngFor="let instructor of instructors" class="instructor-card">
            <div class="instructor-info">
              <div class="instructor-name">{{ instructor.name }}</div>
              <div class="instructor-dept">{{ instructor.dept_name }} Department</div>
              <div class="instructor-salary">{{ instructor.salary | currency }}</div>
            </div>
            <div class="action-buttons">
              <button class="btn btn-update" (click)="prepareUpdate(instructor)">Edit</button>
              <button class="btn btn-delete" (click)="confirmDelete(instructor)">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Add Instructor Form -->  
      <div class="form-section">
        <h3 class="form-title">Add New Instructor</h3>
        <form (ngSubmit)="createInstructor()">
          <div class="form-row">
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newInstructor.name" name="name" placeholder="Full Name" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newInstructor.dept_name" name="dept_name" placeholder="Department Name" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newInstructor.salary" name="salary" placeholder="Salary" type="number" required />
            </div>
          </div>
          <button class="btn btn-submit" type="submit" [disabled]="!isValidInstructor(newInstructor)">Add Instructor</button>
        </form>
      </div>

      <!-- Update Instructor Form -->
      <div *ngIf="updateInstructorData" class="form-section">
        <h3 class="form-title">Update Instructor</h3>
        <form (ngSubmit)="updateInstructor()">
          <div class="form-row">
            <div class="form-group">
              <input class="form-control" [(ngModel)]="updateInstructorData.name" name="name" placeholder="Full Name" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="updateInstructorData.dept_name" name="dept_name" placeholder="Department Name" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="updateInstructorData.salary" name="salary" placeholder="Salary" type="number" required />
            </div>
          </div>
          <div class="form-row">
            <button class="btn btn-submit" type="submit" [disabled]="!isValidInstructor(updateInstructorData)">Update Instructor</button>
            <button class="btn btn-delete" type="button" (click)="cancelUpdate()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class InstructorsComponent implements OnInit {
  instructors: any[] = [];
  newInstructor = { name: '', dept_name: '', salary: null };
  updateInstructorData: any = null;
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchInstructors();
  }

  // Fetch all instructors from the API
  fetchInstructors(): void {
    this.loading = true;
    this.error = '';
    
    this.http.get<any[]>('http://localhost:3000/api/instructors').subscribe(
      (data) => {
        this.instructors = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching instructors:', error);
        this.error = 'Failed to load instructors. Please try again later.';
        this.loading = false;
      }
    );
  }

  // Create a new instructor
  createInstructor(): void {
    if (!this.isValidInstructor(this.newInstructor)) return;
    
    this.loading = true;
    this.http.post('http://localhost:3000/api/instructors', this.newInstructor).subscribe(
      () => {
        this.fetchInstructors(); // Refresh the instructor list after adding a new instructor
        this.newInstructor = { name: '', dept_name: '', salary: null }; // Reset the form
      },
      (error) => {
        console.error('Error creating instructor:', error);
        this.error = 'Failed to add instructor. Please try again.';
        this.loading = false;
      }
    );
  }

  // Prepare data for updating an instructor
  prepareUpdate(instructor: any): void {
    this.updateInstructorData = { ...instructor };
  }

  // Cancel update operation
  cancelUpdate(): void {
    this.updateInstructorData = null;
  }

  // Update an existing instructor
  updateInstructor(): void {
    if (!this.updateInstructorData || !this.isValidInstructor(this.updateInstructorData)) return;

    this.loading = true;
    this.http.put(`http://localhost:3000/api/instructors/${this.updateInstructorData.ID}`, this.updateInstructorData).subscribe(
      () => {
        this.fetchInstructors(); // Refresh the instructor list after updating
        this.updateInstructorData = null; // Reset the update form
      },
      (error) => {
        console.error('Error updating instructor:', error);
        this.error = 'Failed to update instructor. Please try again.';
        this.loading = false;
      }
    );
  }

  // Confirm before deleting an instructor
  confirmDelete(instructor: any): void {
    if (confirm(`Are you sure you want to delete ${instructor.name}?`)) {
      this.deleteInstructor(instructor.ID);
    }
  }

  // Delete an instructor
  deleteInstructor(instructorId: number): void {
    this.loading = true;
    this.http.delete(`http://localhost:3000/api/instructors/${instructorId}`).subscribe(
      () => {
        this.fetchInstructors(); // Refresh the instructor list after deletion
      },
      (error) => {
        console.error('Error deleting instructor:', error);
        this.error = 'Failed to delete instructor. Please try again.';
        this.loading = false;
      }
    );
  }

  // Validate instructor data
  isValidInstructor(instructor: any): boolean {
    return !!instructor.name && !!instructor.dept_name && instructor.salary !== null && instructor.salary !== '';
  }
}