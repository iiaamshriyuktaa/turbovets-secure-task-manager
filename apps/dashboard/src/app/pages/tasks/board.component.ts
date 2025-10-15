import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskStore } from '../../core/task.store';
import { Task } from '../../core/models';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  newTitle = '';

  public store = inject(TaskStore);

  ngOnInit() {
    this.store.load();
  }

  // expose tasks for *ngFor (works whether store.tasks is array or a signal)
  get tasks(): Task[] {
    // TaskStore exposes tasks as a signal<Task[]>
    return this.store.tasks ? this.store.tasks() : [];
  }

  createTask() {
    const title = this.newTitle.trim();
    if (!title) return;

    // Pass a partial Task; the store/repo will fill missing fields like id/createdAt
    this.store.add({ title, status: 'todo' });

    this.newTitle = '';
  }

  toggle(t: Task) {
    // Flip status via the store's update method
    const newStatus = t.status === 'done' ? 'todo' : 'done';
    this.store.update(t.id, { status: newStatus });
  }

  remove(t: Task) {
    this.store.remove(t.id);
  }
}


