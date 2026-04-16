import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyTask } from './MyTask.model';
import { Task } from '../assignments/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class MyTasksService {

  private tasks: MyTask[] = [];
  tasks$: any;

  constructor(private http: HttpClient) { }

  getTasks(): MyTask[] {
    this.http.get<MyTask[]>('http://localhost:3000/api/tasks').subscribe((tasks) => {
      this.tasks = tasks;
    });
    return this.tasks;
  }

  addTask(task: MyTask): void {
    const newTask: MyTask = {
      ...task,
      id: Date.now(),
      isDone: false
    };

  this.http.post<MyTask>('http://localhost:3000/api/tasks', newTask).subscribe((createdTask: MyTask) => {
    this.tasks.push(createdTask);
  });
  }

  toggleTask(id: number): void {
    const task = this.tasks.find(t => t.id === id);

    if (!task) return;

    task.isDone = !task.isDone;

    // auto remove when done
    if (task.isDone) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  }

  // ✅ 🔥 ADD THIS (YOUR MISSING FUNCTION)
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}