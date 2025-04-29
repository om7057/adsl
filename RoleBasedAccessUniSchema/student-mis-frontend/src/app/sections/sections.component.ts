import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Sections</h2>
    <ul>
      <li *ngFor="let section of sections">
        {{ section.course_id }} - Section: {{ section.sec_id }} 
        ({{ section.semester }} {{ section.year }}) 
        - Room: {{ section.building }} {{ section.room_number }} 
        - Time Slot: {{ section.time_slot_id }}
      </li>
    </ul>
  `
})
export class SectionsComponent implements OnInit {
  sections: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSections();
  }

  // Fetch all sections from the API
  fetchSections(): void {
    this.http.get<any[]>('http://localhost:3000/api/sections').subscribe(
      (data) => {
        this.sections = data;
      },
      (error) => {
        console.error('Error fetching sections:', error);
      }
    );
  }
}
