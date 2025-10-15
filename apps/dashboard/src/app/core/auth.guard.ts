import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

export const authGuard: CanActivateFn = () => {
  const tokens = inject(TokenService);
  if (tokens.isAuthed) return true;
  inject(Router).navigateByUrl('/login');
  return false;
};

