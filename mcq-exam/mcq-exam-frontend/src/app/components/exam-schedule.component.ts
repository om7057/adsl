import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-exam-schedule',
  imports: [FormsModule], // Required for ngModel
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div class="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center mb-4">Schedule an Exam</h2>

        <label class="block mb-2 font-semibold">Exam Title</label>
        <input type="text" class="w-full p-2 border rounded-md" [(ngModel)]="exam.title">

        <label class="block mt-4 mb-2 font-semibold">Exam Date</label>
        <input type="datetime-local" class="w-full p-2 border rounded-md" [(ngModel)]="exam.date">

        <label class="block mt-4 mb-2 font-semibold">Duration (minutes)</label>
        <input type="number" class="w-full p-2 border rounded-md" [(ngModel)]="exam.duration">

        <div class="mt-4">
          <label class="flex items-center space-x-2">
            <input type="radio" name="mode" value="fixed" [(ngModel)]="exam.mode">
            <span>Fixed Time (All students start at the same time)</span>
          </label>

          <label class="flex items-center space-x-2 mt-2">
            <input type="radio" name="mode" value="flexible" [(ngModel)]="exam.mode">
            <span>Flexible Time (Students can start at any time within a window)</span>
          </label>
        </div>

        <button (click)="scheduleExam()" class="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Save Exam
        </button>

        <div *ngIf="scheduled" class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          Exam "{{ exam.title }}" scheduled successfully!
        </div>
      </div>
    </div>
  `,
})
export class ExamScheduleComponent {
  exam = { title: '', date: '', duration: 60, mode: 'fixed' };
  scheduled = false;

  scheduleExam() {
    if (this.exam.title && this.exam.date) {
      this.scheduled = true;
    } else {
      alert("Please enter a valid exam title and date.");
    }
  }
}
