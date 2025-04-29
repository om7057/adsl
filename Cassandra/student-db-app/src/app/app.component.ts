import { Component } from '@angular/core';
import { StudentListComponent } from './student-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentListComponent],  // ✅ Fix: Import standalone component directly
  template: '<app-student-list></app-student-list>',
})
export class AppComponent {}
