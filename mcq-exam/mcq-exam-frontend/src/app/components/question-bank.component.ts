import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Question {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
  image: string;
}

@Component({
  standalone: true,
  selector: 'app-question-bank',
  imports: [FormsModule, CommonModule],
  template: `
    <div class="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h2 class="text-3xl font-bold mb-6">Question Bank Management</h2>

      <div class="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Add New Question</h3>

        <label class="block mb-2 font-semibold">Question</label>
        <textarea class="w-full p-2 border rounded-md" rows="3" [(ngModel)]="newQuestion.question"></textarea>

        <label class="block mt-4 mb-2 font-semibold">Upload Image (Optional)</label>
        <input type="file" (change)="handleImageUpload($event)" class="w-full p-2 border rounded-md">

        <div class="grid grid-cols-2 gap-4 mt-4">
          <div *ngFor="let option of optionKeys">
            <label class="block font-semibold">{{ option.toUpperCase() }}:</label>
            <input type="text" class="w-full p-2 border rounded-md" [(ngModel)]="newQuestion[option]">
          </div>
        </div>

        <label class="block mt-4 font-semibold">Correct Answer</label>
        <select class="w-full p-2 border rounded-md" [(ngModel)]="newQuestion.correct">
          <option *ngFor="let option of optionKeys" [value]="option">{{ option.toUpperCase() }}</option>
        </select>

        <button (click)="addQuestion()" class="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Add Question
        </button>
      </div>

      <div *ngIf="questions.length" class="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 class="text-xl font-semibold mb-4">Existing Questions</h3>
        <ul>
          <li *ngFor="let q of questions; let i = index" class="border-b pb-4 mb-4">
            <h4 class="font-semibold">{{ i + 1 }}. {{ q.question }}</h4>
            <img *ngIf="q.image" [src]="q.image" class="w-full max-h-40 mt-2 object-contain rounded-md">
            <p *ngFor="let option of optionKeys" class="text-gray-700">
              <strong>{{ option.toUpperCase() }}:</strong> {{ q[option] }}
            </p>
            <p class="text-green-600 font-semibold mt-2">Correct Answer: {{ q.correct.toUpperCase() }}</p>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class QuestionBankComponent {
  newQuestion: Question = {
    question: '',
    a: '',
    b: '',
    c: '',
    d: '',
    correct: 'a',
    image: ''
  };

  optionKeys: (keyof Omit<Question, 'question' | 'image' | 'correct'>)[] = ['a', 'b', 'c', 'd'];

  questions: Question[] = [];

  addQuestion() {
    if (this.newQuestion.question.trim() && this.newQuestion.a.trim() && this.newQuestion.b.trim() &&
        this.newQuestion.c.trim() && this.newQuestion.d.trim()) {
      this.questions.push({ ...this.newQuestion });
      this.newQuestion = {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correct: 'a',
        image: ''
      };
    } else {
      alert("Please fill all fields before adding a question.");
    }
  }

  handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.newQuestion.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
