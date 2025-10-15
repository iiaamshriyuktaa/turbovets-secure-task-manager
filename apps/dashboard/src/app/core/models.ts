// apps/dashboard/src/app/core/models.ts
export type Status = 'todo' | 'doing' | 'done';
export type Category = 'Work' | 'Personal';

export interface Task {
  id: number;
  title: string;
  status: Status;
  category?: Category;
  createdAt: string;
}
