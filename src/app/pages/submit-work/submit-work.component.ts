import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubmitWorkService } from './submit-work.service';
import { Submission } from './submit-work.model';
import { AssignmentsService } from '../assignments/assignments.service';
import { Task } from '../assignments/assignment.model';

@Component({
  selector: 'app-submit-work',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submit-work.component.html',
  styleUrls: ['./submit-work.component.css']
})
export class SubmitWorkComponent implements OnInit {

  driveLink: string = '';
  notes: string = '';
  selectedTaskId: number | null = null;

  tasks: Task[] = [];
  submissions: Submission[] = [];

  constructor(
    private submitService: SubmitWorkService,
    private assignmentsService: AssignmentsService
  ) {}

  ngOnInit(): void {
    // load tasks for dropdown
    this.assignmentsService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
    this.assignmentsService.getTasks();

    // load submissions
    this.submitService.submissions$.subscribe(data => {
      this.submissions = data;
    });
      const userId = Number(localStorage.getItem('user_id'));
      this.submitService.getByUserId(userId);
  }

  get reviewList(): Submission[] {
    return this.submissions.filter(s => s.status === 'review');
  }

  get approvedList(): Submission[] {
    return this.submissions.filter(s => s.status === 'approved');
  }


  submitWork(): void {
  if (!this.selectedTaskId) { alert('Please select a task'); return; }
  this.submitService.submit(this.selectedTaskId, this.driveLink, this.notes);
  this.driveLink = '';
  this.notes = '';
  this.selectedTaskId = null;
}

  updateStatus(id: number, status: Submission['status']): void {
    this.submitService.updateStatus(id, status);
  }

  markAsDone(id: number): void {
    this.submitService.deleteSubmission(id);
  }
}