import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateStudent(id: number, studentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, studentData);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
