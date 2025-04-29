import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
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
    .student-list {
      list-style: none;
      padding: 0;
    }
    .student-card {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .student-info {
      flex: 1;
    }
    .student-name {
      font-weight: bold;
      font-size: 18px;
      color: #2c3e50;
    }
    .student-dept {
      color: #7f8c8d;
      margin-top: 5px;
    }
    .student-credits {
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
      <h1 class="page-title">Students Management</h1>
      
      <!-- Loading state -->
      <div *ngIf="loading" class="loading-spinner">
        Loading students...
      </div>
      
      <!-- Error state -->
      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>

      <!-- Student list -->
      <div *ngIf="!loading">
        <ul class="student-list">
          <li *ngIf="students.length === 0" class="empty-state">
            No students found. Add your first student below.
          </li>
          <li *ngFor="let student of students" class="student-card">
            <div class="student-info">
              <div class="student-name">{{ student.name }}</div>
              <div class="student-dept">Department: {{ student.dept_name }}</div>
              <div class="student-credits">Total Credits: {{ student.tot_cred }}</div>
            </div>
            <div class="action-buttons">
              <button class="btn btn-delete" (click)="confirmDelete(student)">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Add Student Form -->  
      <div class="form-section">
        <h3 class="form-title">Add New Student</h3>
        <form (ngSubmit)="createStudent()">
          <div class="form-row">
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newStudent.name" name="name" placeholder="Student Name" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newStudent.dept_name" name="dept_name" placeholder="Department Name" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newStudent.tot_cred" name="tot_cred" placeholder="Total Credits" type="number" required />
            </div>
          </div>
          <button class="btn btn-submit" type="submit" [disabled]="!isValidStudent(newStudent)">Add Student</button>
        </form>
      </div>
    </div>
  `
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  newStudent = { name: '', dept_name: '', tot_cred: null };
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  // Fetch all students from the API
  fetchStudents(): void {
    this.loading = true;
    this.error = '';
    
    this.http.get<any[]>('http://localhost:3000/api/students').subscribe(
      (data) => {
        this.students = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching students:', error);
        this.error = 'Failed to load students. Please try again later.';
        this.loading = false;
      }
    );
  }

  // Create a new student
  createStudent(): void {
    if (!this.isValidStudent(this.newStudent)) return;
    
    this.loading = true;
    this.http.post('http://localhost:3000/api/students', this.newStudent).subscribe(
      () => {
        this.fetchStudents(); // Refresh the list after adding a student
        this.newStudent = { name: '', dept_name: '', tot_cred: null }; // Reset the form
      },
      (error) => {
        console.error('Error adding student:', error);
        this.error = 'Failed to add student. Please try again.';
        this.loading = false;
      }
    );
  }

  // Confirm before deleting
  confirmDelete(student: any): void {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      this.deleteStudent(student.ID);
    }
  }

  // Delete a student
  deleteStudent(studentId: number): void {
    this.loading = true;
    this.http.delete(`http://localhost:3000/api/students/${studentId}`).subscribe(
      () => {
        this.fetchStudents(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting student:', error);
        this.error = 'Failed to delete student. Please try again.';
        this.loading = false;
      }
    );
  }

  // Validate student data
  isValidStudent(student: any): boolean {
    return !!student.name && !!student.dept_name && student.tot_cred !== null && student.tot_cred !== '';
  }
}