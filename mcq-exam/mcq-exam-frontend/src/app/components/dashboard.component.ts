import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <h2 class="text-3xl font-bold mb-6 text-center">Dashboard</h2>
      <div class="grid grid-cols-3 gap-6">
        <div *ngFor="let stat of stats" class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-xl font-semibold">{{ stat.label }}</h3>
          <p class="text-3xl font-bold text-blue-600">{{ stat.value }}</p>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  stats = [
    { label: "Total Students", value: 120 },
    { label: "Total Tests", value: 10 },
    { label: "Ongoing Exams", value: 5 },
    { label: "Terminated Exams", value: 2 },
    { label: "Completed Exams", value: 8 },
  ];
}
