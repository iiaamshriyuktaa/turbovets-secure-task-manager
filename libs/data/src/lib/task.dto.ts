import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './enums';
export class CreateTaskDto { @IsString() title!: string; @IsOptional() @IsString() description?: string; @IsOptional() @IsEnum(TaskStatus) status?: TaskStatus; }
export class UpdateTaskDto { @IsOptional() @IsString() title?: string; @IsOptional() @IsString() description?: string; @IsOptional() @IsEnum(TaskStatus) status?: TaskStatus; }
