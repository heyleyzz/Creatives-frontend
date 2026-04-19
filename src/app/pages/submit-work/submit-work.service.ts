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

  submit(task_id: number, drive_link: string = '', notes: string = ''): void {
  const user_id = Number(localStorage.getItem('user_id'));
  
  console.log('task_id received in service:', task_id, typeof task_id); // ← add this
  console.log('Number(task_id):', Number(task_id)); // ← add this
  
  this.http.post<Submission>(this.API_URL, { 
    task_id: Number(task_id), 
    user_id, 
    status: 'review',  // ← hardcoded, no longer a parameter
    drive_link 
  }).subscribe({
    next: () => {
      this.getByUserId(user_id); // ← reload from DB after submit
    },
    error: (err) => console.error('Submit error:', err)
  });
}

updateStatus(id: number, status: Submission['status']): void {
  const user_id = Number(localStorage.getItem('user_id'));
  
  this.http.patch(`${this.API_URL}/${id}/status`, { status }).subscribe({
    next: () => {
      this.getByUserId(user_id); // ← reload from DB after status change
    },
    error: (err) => console.error('Update status error:', err)
  });
}

deleteSubmission(id: number): void {
    this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
      const filtered = this.submissionsSubject.getValue().filter(s => s.id !== id);
      this.submissionsSubject.next(filtered);
    });
  }
}