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
    description: '',
    dueDate: '',
    department: 'videographer',
    status: 'pending'
  };

  constructor(private assignmentService: AssignmentsService) {}

  ngOnInit(): void {
    this.assignmentService.tasks$.subscribe((tasks: any) => {
      this.tasks = [...tasks];
    });

    this.assignmentService.getTasks();
  }

  getTasksByDept(dept: string): Task[] {
    return this.tasks.filter(t => t.department === dept);
  }

  openForm(dept: string): void {
    this.showForm = dept;

    this.newTask = {
      id: 0,
      title: '',
      description: '',
      dueDate: '',
      department: dept,
      status: 'pending'
    };
  }

  addTask(): void {
    if (!this.newTask.title || !this.newTask.description || !this.newTask.dueDate || !this.newTask.department) return;

    //console.log('Sending task:', this.newTask); // ← add this temporarily

    this.assignmentService.addTask({
      ...this.newTask,
      isDone: false
    });

    this.newTask = {
      id: 0,
      title: '',
      description: '',
      dueDate: '',
      department: this.showForm!,
      status: 'pending'
    };

    this.showForm = null;
  }

  // 🔥 ADD THIS ONLY
  deleteTask(id: number): void {
    this.assignmentsService.removeTask(id);
  }
}