export interface Submission {
  id?: number;
  task_id: number;
  user_id: number;
  status: 'review' | 'approved' | 'posted';
  drive_link?: string;
  notes?: string;
  created_at?: string;
}