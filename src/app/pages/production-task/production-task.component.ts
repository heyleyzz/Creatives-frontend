import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import Chart from 'chart.js/auto';

import { AssignmentsService } from '../assignments/assignments.service';

@Component({
  selector: 'app-production-task',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './production-task.component.html',
  styleUrls: ['./production-task.component.css']
})
export class ProductionTaskComponent implements OnInit {

  pending: any[] = [];
  inProgress: any[] = [];
  complete: any[] = [];

  chart: any;

  constructor(
    private assignmentsService: AssignmentsService,
    private cdr: ChangeDetectorRef // ✅ ADDED
  ) {}

  ngOnInit(): void {
    this.initChart();

    this.assignmentsService.tasks$.subscribe(tasks => {

      const fixedTasks = tasks.map(t => ({
        ...t,
        status: t.status || 'pending'
      }));

      this.pending = [...fixedTasks.filter(t => t.status === 'pending')];
      this.inProgress = [...fixedTasks.filter(t => t.status === 'in-progress')];
      this.complete = [...fixedTasks.filter(t => t.status === 'complete')];

      console.log('DEBUG TASKS:', fixedTasks);

      this.refreshChart();

      this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
    });
  }

  // 📊 CHART
  initChart() {
    const ctx = document.getElementById('performanceChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Task Status'],
        datasets: [
          { label: 'Pending', data: [0], backgroundColor: '#9ca3af' },
          { label: 'In Progress', data: [0], backgroundColor: '#f59e0b' },
          { label: 'Completed', data: [0], backgroundColor: '#22c55e' }
        ]
      }
    });
  }

  refreshChart() {
    if (!this.chart) return;

    this.chart.data.datasets[0].data = [this.pending.length];
    this.chart.data.datasets[1].data = [this.inProgress.length];
    this.chart.data.datasets[2].data = [this.complete.length];

    this.chart.update();
  }

  // 🔥 DRAG LOGIC
 drop(event: CdkDragDrop<any[]>) {

  if (event.previousContainer !== event.container) {

    const movedTask = event.previousContainer.data[event.previousIndex];

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // ✅ UPDATE STATUS
    if (event.container.id === 'pendingList') {
      movedTask.status = 'pending';
      movedTask.isDone = false;
    }

    if (event.container.id === 'inProgressList') {
      movedTask.status = 'in-progress';
      movedTask.isDone = false;
    }

    if (event.container.id === 'completeList') {
      movedTask.status = 'complete';
      movedTask.isDone = true;
    }

    // 🔥 SAVE TO SERVICE (THIS FIXES RESET BUG)
    this.assignmentsService.updateTask(movedTask);

    this.refreshChart();
  }
}
}