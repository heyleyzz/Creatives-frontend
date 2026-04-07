import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './assignment.model';
import { AssignmentsService } from './assignments.service';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  tasks: Task[] = [];

  departments = [
    { key: 'videographer', label: 'VIDEOGRAPHERS', color: '#dc2626' },
    { key: 'photographer', label: 'PHOTOGRAPHERS', color: '#f59e0b' },
    { key: 'graphic_designer', label: 'GRAPHIC DESIGNERS', color: '#2563eb' },
    { key: 'video_editor', label: 'VIDEO EDITORS', color: '#7c3aed' }
  ];

  showForm: string | null = null;

  newTask: Task = {
    id: 0,
    title: '',
    dueDate: '',
    department: 'videographer',
    status: 'pending'
  };

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    this.assignmentsService.tasks$.subscribe(tasks => {
      this.tasks = [...tasks];
    });
  }

  getTasksByDept(dept: string): Task[] {
    return this.tasks.filter(t => t.department === dept);
  }

  openForm(dept: string): void {
    this.showForm = dept;

    this.newTask = {
      id: 0,
      title: '',
      dueDate: '',
      department: dept, // ✅ FIXED COMMA
      status: 'pending'
    };
  }

  addTask(): void {
    if (!this.newTask.title || !this.newTask.dueDate) return;

    this.assignmentsService.addTask({
  ...this.newTask,
  isDone: false
});

    // RESET FORM
    this.newTask = {
      id: 0,
      title: '',
      dueDate: '',
      department: this.showForm!, // ✅ FIXED COMMA
      status: 'pending'
    };

    this.showForm = null;
  }
}