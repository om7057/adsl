import { Routes } from '@angular/router';
import { ExamDashboardComponent } from './components/exam-dashboard.component';
import { QuestionBankComponent } from './components/question-bank.component';
import { ExamAttemptComponent } from './components/exam-attempt.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: ExamDashboardComponent },
  { path: 'question-bank', component: QuestionBankComponent },
  { path: 'attempt-exam', component: ExamAttemptComponent },
];
