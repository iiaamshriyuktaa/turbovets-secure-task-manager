import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth.interceptor';
import { TasksRepo } from './core/tasks.repo';

import { LocalTasksRepo } from './core/local-tasks.repo'; // ← default now

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: TasksRepo, useClass: LocalTasksRepo }
  ]
};

