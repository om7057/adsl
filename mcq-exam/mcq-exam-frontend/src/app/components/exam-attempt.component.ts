import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-exam-attempt',
  imports: [FormsModule], // ✅ Import FormsModule
  template: `
    <div class="min-h-screen p-6 bg-gray-100">
      <h2 class="text-3xl font-bold text-center mb-6">MCQ Exam</h2>
      <div *ngIf="!submitted" class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div *ngFor="let q of questions; let i = index" class="mb-6">
          <h3 class="text-lg font-semibold">{{ i + 1 }}. {{ q.question }}</h3>
          <div class="space-y-2">
            <label *ngFor="let option of ['A', 'B', 'C', 'D']" class="flex items-center space-x-2">
              <input type="radio" name="q{{ i }}" [value]="option" [(ngModel)]="q.selected">
              <span>{{ q[option.toLowerCase()] }}</span>
            </label>
          </div>
        </div>
        <button (click)="submitExam()" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Submit Exam
        </button>
      </div>

      <div *ngIf="submitted" class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-center text-green-600">Exam Submitted!</h2>
        <p class="text-center text-lg font-semibold">Score: {{ score }} / {{ questions.length }}</p>
        <button (click)="restartExam()" class="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600">
          Retry Exam
        </button>
      </div>
    </div>
  `,
})
export class ExamAttemptComponent {
  questions = [
    { question: "What is 2 + 2?", a: "3", b: "4", c: "5", d: "6", correct: "B", selected: "" },
    { question: "Capital of France?", a: "Berlin", b: "Madrid", c: "Paris", d: "Lisbon", correct: "C", selected: "" },
    { question: "Angular is a ...?", a: "Framework", b: "Library", c: "Language", d: "Tool", correct: "A", selected: "" },
  ];
  
  submitted = false;
  score = 0;

  submitExam() {
    this.score = this.questions.reduce((acc, q) => acc + (q.selected === q.correct ? 1 : 0), 0);
    this.submitted = true;
  }

  restartExam() {
    this.submitted = false;
    this.questions.forEach(q => q.selected = "");
  }
}
