import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../assignments/assignment.model';
import { AssignmentsService } from '../assignments/assignments.service';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './MyTask.component.html',
  styleUrls: ['./MyTask.component.css']
})
export class MyTasksComponent implements OnInit {

  tasks: Task[] = [];

  // 🔥 EDIT THIS
  showWelcome: boolean = false;
  userName: string = '';

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {

    this.userName = localStorage.getItem('name') || '';

    // 🔥 NEW LOGIC (SHOW ONLY AFTER LOGIN/REGISTER)
    const shouldShow = localStorage.getItem('showWelcome');

    if (shouldShow === 'true') {
      this.showWelcome = true;

      localStorage.removeItem('showWelcome');

      setTimeout(() => {
        this.showWelcome = false;
      }, 2500);
    }

    // 🔥 GET ROLE FROM LOGIN
    const userRole = localStorage.getItem('role');

    this.assignmentsService.tasks$.subscribe(data => {
      this.tasks = data.filter(task => task.department === userRole);
    });
  }

  toggleDone(task: Task): void {
    console.log('Clicked task:', task);
  }
}