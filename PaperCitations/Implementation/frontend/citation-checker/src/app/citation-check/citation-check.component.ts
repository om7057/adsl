import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; // <-- Import HttpClientModule

@Component({
  selector: 'app-citation-check',
  standalone: true,
  templateUrl: './citation-check.component.html',
  styleUrls: ['./citation-check.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],  // <-- Add HttpClientModule to imports
})
export class CitationCheckComponent {
  from: string = '';
  to: string = '';
  cites: boolean | null = null;

  private http = inject(HttpClient);

  constructor() {}

  checkCitation() {
  console.log(`Sending from: ${this.from}, to: ${this.to}`);
  this.http
    .get<{ cites: boolean }>(
      `http://localhost:3000/citation-check?from=${this.from}&to=${this.to}`
    )
    .subscribe(
      (response) => {
        console.log('Response from backend:', response);
        this.cites = response.cites;
      },
      (error) => {
        console.error('Error occurred while checking citation:', error);
        this.cites = false; // Default to false if there's an error
      }
    );
}

  
}
