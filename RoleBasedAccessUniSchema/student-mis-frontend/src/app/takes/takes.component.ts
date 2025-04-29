import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-takes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Takes</h2>
    <ul>
      <li *ngFor="let take of takes">
        Student ID: {{ take.ID }} - Course: {{ take.course_id }} - Section: {{ take.sec_id }} - Grade: {{ take.grade }}
      </li>
    </ul>
  `
})
export class TakesComponent implements OnInit {
  takes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTakes();
  }

  // Fetch all takes from the API
  fetchTakes(): void {
    this.http.get<any[]>('http://localhost:3000/api/takes').subscribe(
      (data) => {
        this.takes = data;
      },
      (error) => {
        console.error('Error fetching takes:', error);
      }
    );
  }
}
