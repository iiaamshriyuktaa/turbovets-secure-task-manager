import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from './token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tok = inject(TokenService).token;
  if (tok) req = req.clone({ setHeaders: { Authorization: `Bearer ${tok}` } });
  return next(req);
};

