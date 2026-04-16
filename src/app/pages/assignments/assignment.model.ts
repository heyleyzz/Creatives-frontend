export type TaskStatus = 'pending' | 'in-progress' | 'complete';

export interface Task {
  id: number;
  title: string;
  description: string; // ✅ added
  dueDate: string;
  department: string;
  status: string;
  isDone?: boolean;
}