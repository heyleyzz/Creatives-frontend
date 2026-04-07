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

 constructor(private assignmentsService: AssignmentsService) {}

ngOnInit(): void {
  this.assignmentsService.tasks$.subscribe(data => {
    this.tasks = data;
  });
}
toggleDone(task: Task): void {
  console.log('Clicked task:', task);
}
}