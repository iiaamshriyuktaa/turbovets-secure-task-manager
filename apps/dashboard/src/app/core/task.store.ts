import { Injectable, computed, inject, signal } from '@angular/core';
import { TasksRepo } from './tasks.repo';
import { Task } from '../core/models';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private repo = inject(TasksRepo);
  tasks = signal<Task[]>([]);
  filter = signal(''); cat = signal<''|'Work'|'Personal'>(''); sort = signal<'createdAt'|'title'>('createdAt');

  readonly todo  = computed(()=>this.view('todo'));
  readonly doing = computed(()=>this.view('doing'));
  readonly done  = computed(()=>this.view('done'));

  private view(status:'todo'|'doing'|'done') {
    const q = this.filter().toLowerCase(), c = this.cat(), s = this.sort();
    return this.tasks()
      .filter(t => t.status===status)
      .filter(t => !q || t.title.toLowerCase().includes(q))
      .filter(t => !c || t.category===c)
      .sort((a,b) => s==='createdAt' ? (b.createdAt>a.createdAt?1:-1) : a.title.localeCompare(b.title));
  }

  async load(){ this.tasks.set(await this.repo.list()); }
  async add(dto: Partial<Task>){ const t = await this.repo.create(dto); this.tasks.set([t, ...this.tasks()]); }
  async update(id:number, dto: Partial<Task>){ const t = await this.repo.update(id,dto); this.tasks.set(this.tasks().map(x=>x.id===id? t : x)); }
  async remove(id:number){ await this.repo.remove(id); this.tasks.set(this.tasks().filter(x=>x.id!==id)); }
}
