import { Injectable } from '@angular/core';
import { Task } from './submit-work.model';

@Injectable({
  providedIn: 'root'
})
export class SubmitWorkService {

  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  updateTask(task: Task) {
    const index = this.tasks.findIndex(t => t === task);
    if (index !== -1) { 
      this.tasks[index] = task;
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
  }
}