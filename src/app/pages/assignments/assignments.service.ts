import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private tasks: Task[] = [];

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  // 🔥 ALWAYS EMIT CURRENT DATA
  private emit() {
    this.tasksSubject.next([...this.tasks]); // spread = FIX DELAY
  }

  getTasks(): Task[] {
    return this.tasks;
  }

 addTask(task: Task): void {
  const newTask: Task = {
    id: Date.now(),
    title: task.title,
    dueDate: task.dueDate,
    department: task.department,
    isDone: task.isDone ?? false,
    status: 'pending' // ✅ FORCE STATUS ALWAYS
  };

  this.tasks.unshift(newTask);
  this.emit();
}

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.emit();
  }
  updateTask(updatedTask: Task): void {
  const index = this.tasks.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    this.tasks[index] = { ...updatedTask };
    this.emit();
  }
}
}