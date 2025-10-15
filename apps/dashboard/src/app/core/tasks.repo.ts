import { Task } from '../core/models';

export abstract class TasksRepo {
  abstract list(): Promise<Task[]>;
  abstract create(dto: Partial<Task>): Promise<Task>;
  abstract update(id:number, dto: Partial<Task>): Promise<Task>;
  abstract remove(id:number): Promise<void>;
}
