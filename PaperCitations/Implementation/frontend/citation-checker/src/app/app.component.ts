import { Component } from '@angular/core';
import { CitationCheckComponent } from './citation-check/citation-check.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-citation-check></app-citation-check>`,
  styleUrls: ['./app.component.css'],
  imports: [CitationCheckComponent],
})
export class AppComponent {}
