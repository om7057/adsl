import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Student {
  id: string; // UUID for unique identification
  name: string;
  age: number;
  department: string;
}

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent {
  students: Student[] = [];
  newStudentName: string = '';
  newStudentAge: number | null = null;
  newStudentDepartment: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.http.get<Student[]>('http://localhost:5000/students').subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
        alert('Failed to load students. Please try again.');
      }
    );
  }

  addStudent() {
    if (!this.newStudentName || !this.newStudentAge || !this.newStudentDepartment) {
      alert('Please fill all fields!');
      return;
    }

    const newStudent = {
      name: this.newStudentName,
      age: this.newStudentAge,
      department: this.newStudentDepartment,
    };

    this.http.post('http://localhost:5000/students', newStudent).subscribe(
      () => {
        this.loadStudents();
        this.newStudentName = '';
        this.newStudentAge = null;
        this.newStudentDepartment = '';
      },
      (error) => {
        console.error('Error adding student:', error);
        alert('Error adding student. Please try again.');
      }
    );
  }

  updateStudent(id: string, student: Student) {
    const newName = prompt('Enter new name:', student.name);
    const newAge = prompt('Enter new age:', student.age.toString());
    const newDepartment = prompt('Enter new department:', student.department);

    if (newName && newAge && newDepartment) {
      const updatedStudent = { ...student, name: newName, age: parseInt(newAge), department: newDepartment };

      this.http.put(`http://localhost:5000/students/${id}`, updatedStudent).subscribe(
        () => this.loadStudents(),
        (error) => {
          console.error('Error updating student:', error);
          alert('Error updating student.');
        }
      );
    }
  }

  deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.http.delete(`http://localhost:5000/students/${id}`).subscribe(
        () => this.loadStudents(),
        (error) => {
          console.error('Error deleting student:', error);
          alert('Error deleting student.');
        }
      );
    }
  }
}
