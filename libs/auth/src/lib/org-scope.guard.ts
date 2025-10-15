import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
@Injectable() export class OrgScopeGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) { return true; } // refine later
}
