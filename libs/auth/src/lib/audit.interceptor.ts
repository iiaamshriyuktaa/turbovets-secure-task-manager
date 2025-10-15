import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs/operators';
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const who = req.user?.email ?? 'anonymous';
    const what = `${req.method} ${req.url}`;
    const t0 = Date.now();
    return next.handle().pipe(tap(() => console.log(`[AUDIT] ${who} -> ${what} ${Date.now()-t0}ms`)));
  }
}
