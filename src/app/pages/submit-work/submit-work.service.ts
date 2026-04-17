import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Submission } from './submit-work.model';

@Injectable({ providedIn: 'root' })
export class SubmitWorkService {

  private API_URL = 'http://localhost:3000/api/submissions';
  private submissionsSubject = new BehaviorSubject<Submission[]>([]);
  submissions$ = this.submissionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getByUserId(user_id: number): void {
  this.http.get<Submission[]>(`${this.API_URL}/user/${user_id}`).subscribe(data => {
    this.submissionsSubject.next(data);
  });
}

  getByTask(task_id: number): void {
    this.http.get<Submission[]>(`${this.API_URL}/task/${task_id}`).subscribe(data => {
      this.submissionsSubject.next(data);
    });
  }

  submit(task_id: number, drive_link: string = '', notes: string = '', status: Submission['status'] = 'review'): void {
  const user_id = Number(localStorage.getItem('user_id'));
  this.http.post<Submission>(this.API_URL, { task_id, user_id, status, drive_link, notes })
    .subscribe(created => {
      const current = this.submissionsSubject.getValue();
      this.submissionsSubject.next([...current, created]); // ← works once backend returns the full row
    });
}

  updateStatus(id: number, status: Submission['status']): void {
    this.http.patch(`${this.API_URL}/${id}/status`, { status }).subscribe(() => {
      const updated = this.submissionsSubject.getValue().map(s =>
        s.id === id ? { ...s, status } : s
      );
      this.submissionsSubject.next(updated);
    });
  }

  deleteSubmission(id: number): void {
    this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
      const filtered = this.submissionsSubject.getValue().filter(s => s.id !== id);
      this.submissionsSubject.next(filtered);
    });
  }
}