import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { BoardComponent } from './pages/tasks/board.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [authGuard], component: BoardComponent },
  { path: '**', redirectTo: '' }
];
