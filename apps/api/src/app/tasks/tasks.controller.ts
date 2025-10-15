import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../../../../../libs/data/src/lib/task.dto';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from '../../../../../libs/auth/src/lib/rbac.guard';
import { OrgScopeGuard } from '../../../../../libs/auth/src/lib/org-scope.guard';
import { AuditInterceptor } from '../../../../../libs/auth/src/lib/audit.interceptor';
import { Permissions } from '../../../../../libs/auth/src/lib/permissions.decorator';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'), RbacGuard, OrgScopeGuard)
@UseInterceptors(AuditInterceptor)
export class TasksController {
  constructor(private tasks: TasksService) {}

  @Get() findAll() { return this.tasks.findAll(); }

  @Post()
  @Permissions('task:create')
  create(@Body() dto: CreateTaskDto) { return this.tasks.create(dto); }

  @Put(':id')
  @Permissions('task:edit')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) { return this.tasks.update(id, dto); }

  @Delete(':id')
  @Permissions('task:delete')
  remove(@Param('id') id: string) { return this.tasks.remove(id); }
}
