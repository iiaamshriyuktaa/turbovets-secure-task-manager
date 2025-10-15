import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],   // ← needed for *ngFor, *ngIf and [(ngModel)]
  template: `
    <header style="display:flex;gap:8px;align-items:center">
      <h2 style="margin-right:auto">Tasks</h2>
      <button (click)="logout()">Logout</button>
    </header>

    <form (ngSubmit)="add()" style="display:flex;gap:8px;margin:12px 0">
      <input [(ngModel)]="title" name="title" placeholder="Quick add..." />
      <button>Add</button>
    </form>

    <ul>
      <li *ngFor="let t of tasks">{{t.title}}</li>
    </ul>

    <p *ngIf="error" style="color:#b00020">{{error}}</p>
  `
})
export class TasksComponent implements OnInit {
  // Minimal Task shape matching backend entity
  tasks: Task[] = [];
  title = '';
  error = '';
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get<Task[]>('/api/tasks').subscribe({
      next: (t: Task[]) => (this.tasks = t),
      error: (e: HttpErrorResponse) => (this.error = e?.error?.message ?? 'Failed to load tasks')
    });
  }
  add() {
    if (!this.title.trim()) return;
    this.http.post<Task>('/api/tasks', { title: this.title }).subscribe({
      next: (t: Task) => {
        this.tasks = [t, ...this.tasks];
        this.title = '';
      },
      error: (e: HttpErrorResponse) => (this.error = e?.error?.message ?? 'Failed to create task')
    });
  }
  logout(){ localStorage.removeItem('jwt'); location.href = '/login'; }
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  // owner and org are present on backend but we don't use them in this component
  owner?: { id?: string; email?: string; name?: string };
  org?: { id?: string; name?: string };
}
