import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-report-generator',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  template: `
    <h2>Report Generator</h2>
    <select [(ngModel)]="selectedEntity">
      <option value="students">Students</option>
      <option value="courses">Courses</option>
      <option value="departments">Departments</option>
    </select>
    <button (click)="generateReport()">Generate Report</button>
    <ul>
      <li *ngFor="let item of data">{{ item | json }}</li>
    </ul>
  `
})
export class ReportGeneratorComponent {
  selectedEntity = 'students';
  data: any[] = [];

  constructor(private http: HttpClient) {}

  generateReport() {
    this.http.get(`http://localhost:3000/api/reports/${this.selectedEntity}`)
      .subscribe(data => this.data = data as any[]);
  }
}
