import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teaches',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Teaches</h2>
    <ul>
      <li *ngFor="let teach of teaches">
        Instructor ID: {{ teach.ID }} - Course: {{ teach.course_id }} - Section: {{ teach.sec_id }} 
        - Semester: {{ teach.semester }} {{ teach.year }}
      </li>
    </ul>
  `
})
export class TeachesComponent implements OnInit {
  teaches: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTeaches();
  }

  // Fetch all teaches from the API
  fetchTeaches(): void {
    this.http.get<any[]>('http://localhost:3000/api/teaches').subscribe(
      (data) => {
        this.teaches = data;
      },
      (error) => {
        console.error('Error fetching teaches:', error);
      }
    );
  }
}
