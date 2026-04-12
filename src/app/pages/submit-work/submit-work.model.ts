export interface Comment {
  text: string;
  createdAt?: Date;
}

export interface Task {
  id?: number;

  title: string;
  description?: string;

  files: string[]; // ✅ DATABASE READY (URLs)

  comments: Comment[];

  status: 'review' | 'post';

  isRevising?: boolean;
  newComment?: string;

  createdAt?: Date;
  updatedAt?: Date;
}