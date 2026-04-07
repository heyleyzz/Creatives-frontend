import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

interface Comment {
  text: string;
}

interface TaskItem {
  title: string;
  description?: string;
  files: File[];
  comments: Comment[];
  newComment: string;
  isRevising: boolean;
}

@Component({
  selector: 'app-submit-work',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './submit-work.component.html',
  styleUrls: ['./submit-work.component.css']
})
export class SubmitWorkComponent {

  title = '';
  description = '';
  files: File[] = [];

  reviewList: TaskItem[] = [];
  postList: TaskItem[] = [];

  // 🔥 FILE PREVIEW (REQUIRED FOR HTML)
  selectedFile: File | null = null;
  fileUrl: string = '';

  // 📁 FILE SELECT (SAFE)
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

  // 🚀 SUBMIT
  submitWork() {
    if (!this.title.trim()) return;

    this.reviewList.push({
      title: this.title,
      description: this.description,
      files: [...this.files],
      comments: [],
      newComment: '',
      isRevising: false
    });

    // reset
    this.title = '';
    this.description = '';
    this.files = [];
  }

  // 💬 ADD COMMENT
  addComment(item: TaskItem) {
    if (!item.newComment.trim()) return;

    item.comments.push({
      text: item.newComment
    });

    item.newComment = '';
  }

  // 🔁 ENABLE REVISION
  enableRevision(item: TaskItem) {
    item.isRevising = true;
  }

  // 📁 UPLOAD REVISION (SAFE)
  onRevisionUpload(event: Event, item: TaskItem) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    item.files = [file];

    item.comments.push({
      text: 'Revision uploaded'
    });

    item.isRevising = false;
  }

  // 🔥 FILE PREVIEW (FIXES YOUR ERROR)
  previewFile(file: File) {
    if (!file) return;

    this.selectedFile = file;

    // revoke old URL (prevents memory leak)
    if (this.fileUrl) {
      URL.revokeObjectURL(this.fileUrl);
    }

    if (file.type && file.type.startsWith('image/')) {
      this.fileUrl = URL.createObjectURL(file);
    } else {
      this.fileUrl = '';
    }
  }

  // 🔄 DRAG DROP
  drop(event: CdkDragDrop<TaskItem[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // ✅ MARK AS DONE
  markAsDone(item: TaskItem) {
    this.postList = this.postList.filter(i => i !== item);
  }
}