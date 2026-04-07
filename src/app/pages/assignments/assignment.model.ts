export type TaskStatus = 'pending' | 'in-progress' | 'complete';

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  department: string;
  isDone?: boolean;
  status: TaskStatus;
}