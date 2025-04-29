import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-exam-dashboard',
  template: `
    <div class="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 class="text-3xl font-bold mb-6">Exam Monitoring Dashboard</h2>
      
      <div class="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold">Exam: {{ exam.title }}</h3>
        <p class="text-gray-700">Date: {{ exam.date }}</p>
        <p class="text-gray-700">Duration: {{ exam.duration }} mins</p>
        <p class="text-gray-700">Mode: {{ exam.mode === 'fixed' ? 'Fixed Time' : 'Flexible Time' }}</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="p-4 bg-blue-100 border-l-4 border-blue-500 rounded-md">
            <h4 class="text-xl font-bold">{{ stats.started }}</h4>
            <p class="text-gray-600">Started</p>
          </div>
          <div class="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
            <h4 class="text-xl font-bold">{{ stats.ongoing }}</h4>
            <p class="text-gray-600">Ongoing</p>
          </div>
          <div class="p-4 bg-green-100 border-l-4 border-green-500 rounded-md">
            <h4 class="text-xl font-bold">{{ stats.completed }}</h4>
            <p class="text-gray-600">Completed</p>
          </div>
          <div class="p-4 bg-red-100 border-l-4 border-red-500 rounded-md">
            <h4 class="text-xl font-bold">{{ stats.terminated }}</h4>
            <p class="text-gray-600">Terminated</p>
          </div>
        </div>

        <button (click)="refreshData()" class="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Refresh Dashboard
        </button>
      </div>
    </div>
  `,
})
export class ExamDashboardComponent {
  exam = {
    title: "Final Term MCQ Exam",
    date: "2025-02-15 10:00 AM",
    duration: 60,
    mode: "fixed",
  };

  stats = {
    started: 25,
    ongoing: 15,
    completed: 8,
    terminated: 2,
  };

  refreshData() {
    // Simulating data update
    this.stats.started += Math.floor(Math.random() * 5);
    this.stats.ongoing = Math.max(0, this.stats.started - this.stats.completed - this.stats.terminated);
    this.stats.completed += Math.floor(Math.random() * 3);
    this.stats.terminated += Math.floor(Math.random() * 2);
  }
}
