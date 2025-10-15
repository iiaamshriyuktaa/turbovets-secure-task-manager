import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../../../../../libs/data/src/lib/task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repo: Repository<Task>) {}

  findAll() { return this.repo.find(); }

  create(dto: CreateTaskDto) {
    const t = this.repo.create(dto as any);
    return this.repo.save(t);
  }

  async update(id: string, dto: UpdateTaskDto) {
    const t = await this.repo.findOne({ where: { id } });
    if (!t) throw new NotFoundException();
    Object.assign(t, dto);
    return this.repo.save(t);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { id };
  }
}
