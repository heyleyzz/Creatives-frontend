import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Task } from './assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private http = inject(HttpClient);
  private tasks: Task[] = [];
  private API_URL = 'http://localhost:3000/api/tasks';

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  // 🔥 A LWAYS EMIT CURRENT DATA
  private emit() {
    this.tasksSubject.next([...this.tasks]);
  }

  getTasks(): void {
    this.http.get<Task[]>(this.API_URL).subscribe((tasks) => {
      this.tasks = tasks;
      this.emit();
    });
  }

  addTask(task: Omit<Task, 'id'>): void {
    console.log('Payload being sent:', JSON.stringify(task)); // ← add this
    this.http.post<Task>(this.API_URL, task).subscribe((created) => {
      this.tasks.push(created);
      this.emit();
    });
  }

  removeTask(id: number): void {
    this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.emit();
    });
  }

  updateTask(updatedTask: Task): void {
    this.http.patch(`${this.API_URL}/${updatedTask.id}/status`, { status: updatedTask.status }).subscribe(() => {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = { ...updatedTask };
        this.emit();
      }
    });
  }

}
