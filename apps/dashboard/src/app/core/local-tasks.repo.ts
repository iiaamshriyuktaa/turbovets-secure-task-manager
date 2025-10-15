import { TasksRepo } from './tasks.repo';
import { Task } from '../core/models';

const KEY = 'tasks.v1';
const read = (): Task[] => JSON.parse(localStorage.getItem(KEY) ?? '[]');
const write = (v: Task[]) => localStorage.setItem(KEY, JSON.stringify(v));

export class LocalTasksRepo implements TasksRepo {
  async list(){ return read(); }
  async create(dto: Partial<Task>){
    const a = read();
    const t: Task = {
      id: (a[0]?.id ?? 0) + 1,
      title: dto.title ?? 'New Task',
      status: (dto.status as any) ?? 'todo',
      category: dto.category as any,
      createdAt: new Date().toISOString()
    };
    write([t, ...a]); return t;
  }
  async update(id:number, dto: Partial<Task>){
    const a = read().map(t => t.id===id ? { ...t, ...dto } : t);
    write(a); return a.find(t=>t.id===id)!;
  }
  async remove(id:number){ write(read().filter(t => t.id!==id)); }
}
