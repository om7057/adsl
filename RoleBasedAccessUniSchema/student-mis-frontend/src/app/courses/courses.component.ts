import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
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
    .course-list {
      list-style: none;
      padding: 0;
    }
    .course-card {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .course-info {
      flex: 1;
    }
    .course-title {
      font-weight: bold;
      font-size: 18px;
      color: #2c3e50;
    }
    .course-id {
      color: #7f8c8d;
      margin-top: 5px;
      font-size: 14px;
    }
    .course-department {
      color: #7f8c8d;
      margin-top: 3px;
    }
    .course-credits {
      color: #16a085;
      font-weight: bold;
      margin-top: 3px;
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
    .form-control.disabled {
      background-color: #ecf0f1;
      cursor: not-allowed;
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
      <h1 class="page-title">Courses Management</h1>
      
      <!-- Loading state -->
      <div *ngIf="loading" class="loading-spinner">
        Loading courses...
      </div>
      
      <!-- Error state -->
      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>

      <!-- Course list -->
      <div *ngIf="!loading">
        <ul class="course-list">
          <li *ngIf="courses.length === 0" class="empty-state">
            No courses found. Add your first course below.
          </li>
          <li *ngFor="let course of courses" class="course-card">
            <div class="course-info">
              <div class="course-title">{{ course.title }}</div>
              <div class="course-id">Course ID: {{ course.course_id }}</div>
              <div class="course-department">Department: {{ course.dept_name }}</div>
              <div class="course-credits">Credits: {{ course.credits }}</div>
            </div>
            <div class="action-buttons">
              <button class="btn btn-update" (click)="prepareUpdate(course)">Edit</button>
              <button class="btn btn-delete" (click)="confirmDelete(course)">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Create Course Form -->  
      <div class="form-section">
        <h3 class="form-title">Create New Course</h3>
        <form (ngSubmit)="createCourse()">
          <div class="form-row">
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newCourse.course_id" name="course_id" placeholder="Course ID" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newCourse.title" name="title" placeholder="Course Title" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newCourse.dept_name" name="dept_name" placeholder="Department Name" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="newCourse.credits" name="credits" placeholder="Credits" type="number" required />
            </div>
          </div>
          <button class="btn btn-submit" type="submit" [disabled]="!isValidCourse(newCourse)">Create Course</button>
        </form>
      </div>

      <!-- Update Course Form -->
      <div *ngIf="updateCourseData" class="form-section">
        <h3 class="form-title">Update Course</h3>
        <form (ngSubmit)="updateCourse()">
          <div class="form-row">
            <div class="form-group">
              <input class="form-control disabled" [(ngModel)]="updateCourseData.course_id" name="course_id" placeholder="Course ID" disabled />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="updateCourseData.title" name="title" placeholder="Course Title" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <input class="form-control" [(ngModel)]="updateCourseData.dept_name" name="dept_name" placeholder="Department Name" required />
            </div>
            <div class="form-group">
              <input class="form-control" [(ngModel)]="updateCourseData.credits" name="credits" placeholder="Credits" type="number" required />
            </div>
          </div>
          <div class="form-row">
            <button class="btn btn-submit" type="submit" [disabled]="!isValidUpdateCourse(updateCourseData)">Update Course</button>
            <button type="button" class="btn btn-delete" (click)="cancelUpdate()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  newCourse = { course_id: '', title: '', dept_name: '', credits: null };
  updateCourseData: any = null;
  loading = false;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  // Fetch all courses from the API
  fetchCourses(): void {
    this.loading = true;
    this.error = '';
    
    this.http.get<any[]>('http://localhost:3000/api/courses').subscribe(
      (data) => {
        this.courses = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching courses:', error);
        this.error = 'Failed to load courses. Please try again later.';
        this.loading = false;
      }
    );
  }

  // Create a new course
  createCourse(): void {
    if (!this.isValidCourse(this.newCourse)) return;
    
    this.loading = true;
    this.http.post('http://localhost:3000/api/courses', this.newCourse).subscribe(
      () => {
        this.fetchCourses(); // Refresh the course list after adding a new course
        this.newCourse = { course_id: '', title: '', dept_name: '', credits: null }; // Reset the form
      },
      (error) => {
        console.error('Error creating course:', error);
        this.error = 'Failed to create course. Please try again.';
        this.loading = false;
      }
    );
  }

  // Prepare data for updating a course
  prepareUpdate(course: any): void {
    this.updateCourseData = { ...course };
  }

  // Cancel update operation
  cancelUpdate(): void {
    this.updateCourseData = null;
  }

  // Update an existing course
  updateCourse(): void {
    if (!this.updateCourseData || !this.isValidUpdateCourse(this.updateCourseData)) return;

    this.loading = true;
    this.http.put(`http://localhost:3000/api/courses/${this.updateCourseData.course_id}`, this.updateCourseData).subscribe(
      () => {
        this.fetchCourses(); // Refresh the course list after updating
        this.updateCourseData = null; // Reset the update form
      },
      (error) => {
        console.error('Error updating course:', error);
        this.error = 'Failed to update course. Please try again.';
        this.loading = false;
      }
    );
  }

  // Confirm before deleting
  confirmDelete(course: any): void {
    if (confirm(`Are you sure you want to delete "${course.title}" (${course.course_id})?`)) {
      this.deleteCourse(course.course_id);
    }
  }

  // Delete a course
  deleteCourse(courseId: string): void {
    this.loading = true;
    this.http.delete(`http://localhost:3000/api/courses/${courseId}`).subscribe(
      () => {
        this.fetchCourses(); // Refresh the course list after deletion
      },
      (error) => {
        console.error('Error deleting course:', error);
        this.error = 'Failed to delete course. Please try again.';
        this.loading = false;
      }
    );
  }

  // Validate course data for creation
  isValidCourse(course: any): boolean {
    return !!course.course_id && !!course.title && !!course.dept_name && course.credits !== null && course.credits !== '';
  }

  // Validate course data for update
  isValidUpdateCourse(course: any): boolean {
    return !!course.title && !!course.dept_name && course.credits !== null && course.credits !== '';
  }
}