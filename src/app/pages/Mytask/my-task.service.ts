import { Injectable } from '@angular/core';
import { MyTask } from './MyTask.model';

@Injectable({
  providedIn: 'root'
})
export class MyTasksService {

  private tasks: MyTask[] = [];

  getTasks(): MyTask[] {
    return this.tasks;
  }

  addTask(task: MyTask): void {
    const newTask: MyTask = {
      ...task,
      id: Date.now(),
      isDone: false
    };

    this.tasks.unshift(newTask);
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