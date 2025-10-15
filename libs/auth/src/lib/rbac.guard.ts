import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { PERMS_KEY } from './permissions.decorator';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const needRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [ctx.getHandler(), ctx.getClass()]) ?? [];
    const needPerms = this.reflector.getAllAndOverride<string[]>(PERMS_KEY, [ctx.getHandler(), ctx.getClass()]) ?? [];
    const user = ctx.switchToHttp().getRequest().user;
    if (!user) throw new ForbiddenException('Unauthenticated');
    if (needRoles.length && !user.roles?.some((r: any) => needRoles.includes(r.name ?? r))) throw new ForbiddenException('Insufficient role');
    if (needPerms.length && !user.permissions?.some((p: any) => needPerms.includes(p.key ?? p))) throw new ForbiddenException('Insufficient permission');
    return true;
  }
}
