export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: number;
  title: string;
  description: string; // ✅ added
  dueDate: string;
  department: string;
  status: string;
  isDone?: boolean;
}