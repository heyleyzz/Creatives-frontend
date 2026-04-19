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

  // UI only
  title: string = '';

  tasks: Task[] = [];
  submissions: Submission[] = [];

  draggedItem: Submission | null = null;

  constructor(
    private submitService: SubmitWorkService,
    private assignmentsService: AssignmentsService
  ) {}

  ngOnInit(): void {
    this.assignmentsService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
          console.log('Tasks loaded:', tasks); // ← add this
    });
    this.assignmentsService.getTasks();

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

  // ✅ CLEAN SUBMIT (NO ALERT, NO ERROR)
submitWork(): void {
  if (!this.selectedTaskId) {
    alert('Please select a task');
    return;  // ← stops here if null, so Number(null) never happens
  }

  if (!this.driveLink) {
    alert('Please add a Google Drive link');
    return;
  }

  console.log('selectedTaskId:', this.selectedTaskId);

  this.submitService.submit(Number(this.selectedTaskId), this.driveLink); // ← no notes

  this.driveLink = '';
  this.notes = '';
  this.title = '';
  this.selectedTaskId = null;
}

updateStatus(id: number, status: Submission['status']): void {
  this.submitService.updateStatus(id, status);  // ← no .subscribe(), service handles it
}

  markAsDone(id: number): void {
    this.submitService.deleteSubmission(id);
  }

  // DRAG & DROP
  onDragStart(event: DragEvent, item: Submission) {
    this.draggedItem = item;
  }

  onDrop(event: DragEvent, target: 'review' | 'approved') {
    event.preventDefault();

    if (!this.draggedItem) return;

    const newStatus: Submission['status'] = target === 'approved' ? 'approved' : 'review';
    this.updateStatus(this.draggedItem.id!, newStatus);

    this.draggedItem = null;
  }
}