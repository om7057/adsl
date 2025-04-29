import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentsComponent } from './students/students.component';
import { DepartmentsComponent } from './departments/departments.component';
import { CoursesComponent } from './courses/courses.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { SectionsComponent } from './sections/sections.component';
import { TakesComponent } from './takes/takes.component';
import { TeachesComponent } from './teaches/teaches.component';
import { LoginComponent } from './auth/login.component';
import { ReportGeneratorComponent } from './reports/report-generator.component';
import { UserManagementComponent } from './auth/user-management.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'sections', component: SectionsComponent },
  { path: 'takes', component: TakesComponent },
  { path: 'teaches', component: TeachesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reports', component: ReportGeneratorComponent },
  { path: 'user-management', component: UserManagementComponent }
];