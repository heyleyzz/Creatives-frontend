import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

import { SubmitWorkService } from './submit-work.service';
import { Task } from './submit-work.model';

@Component({
  selector: 'app-submit-work',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './submit-work.component.html',
  styleUrls: ['./submit-work.component.css']
})
export class SubmitWorkComponent implements OnInit {

  constructor(private taskService: SubmitWorkService) {}

  title = '';
  description = '';
  files: File[] = [];

  // ✅ GOOGLE DRIVE
  driveLink: string = '';

  tasks: Task[] = [];

  selectedFile: any = null;
  fileUrl: string = '';

  // ✅ LOAD DATA
  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  // ✅ GETTERS
  get reviewList() {
    return this.tasks.filter(t => t.status === 'review');
  }

  get postList() {
    return this.tasks.filter(t => t.status === 'post');
  }

  // 📁 FILE SELECT
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.files = Array.from(input.files);
  }

  // 📁 DRAG DROP FILE
  onFileDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.files = Array.from(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // 🚀 SUBMIT (FILE + DRIVE LINK)
  submitWork() {
    if (!this.title.trim()) return;

    const newTask: Task = {
      title: this.title,
      description: this.description,

      files: [
        ...this.files.map(f => f.name),
        ...(this.driveLink ? [this.driveLink] : [])
      ],

      comments: [],
      status: 'review',
      isRevising: false,
      createdAt: new Date()
    };

    this.taskService.addTask(newTask);
    this.tasks = this.taskService.getTasks();

    // reset
    this.title = '';
    this.description = '';
    this.files = [];
    this.driveLink = '';
  }

  // 💬 ADD COMMENT
  addComment(item: Task) {
    if (!item.newComment || !item.newComment.trim()) return;

    item.comments.push({
      text: item.newComment,
      createdAt: new Date()
    });

    item.newComment = '';
  }

  // 🔁 ENABLE REVISION
  enableRevision(item: Task) {
    item.isRevising = true;
  }

  // 📁 REVISION UPLOAD
  onRevisionUpload(event: Event, item: Task) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    item.files = [file.name];

    item.comments.push({
      text: 'Revision uploaded',
      createdAt: new Date()
    });

    item.isRevising = false;
  }

  // 🔥 PREVIEW (FILE + DRIVE)
  previewFile(file: any) {
    if (!file) return;

    // Google Drive preview
    if (typeof file === 'string' && file.includes('drive.google.com')) {
      this.fileUrl = file.replace('/view', '/preview');
      this.selectedFile = null;
      return;
    }

    // Local file preview
    if (file instanceof File) {
      this.selectedFile = file;

      if (this.fileUrl) URL.revokeObjectURL(this.fileUrl);

      this.fileUrl = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : '';
    } else {
      this.selectedFile = null;
      this.fileUrl = file;
    }
  }

  // 🔄 DRAG DROP
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      const item = event.previousContainer.data[event.previousIndex];
      const containerText = event.container.element.nativeElement.textContent;

      item.status = containerText.includes('Post') ? 'post' : 'review';
    }
  }

  // ✅ MARK AS DONE
  markAsDone(item: Task) {
    this.tasks = this.tasks.filter(t => t !== item);
  }
}