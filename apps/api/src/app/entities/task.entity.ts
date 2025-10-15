import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from './organization.entity';
import { User } from './user.entity';
export enum TaskStatus { TODO='TODO', IN_PROGRESS='IN_PROGRESS', DONE='DONE' }
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() title!: string;
  @Column({ nullable: true }) description?: string;
  @Column({ type: 'text', default: TaskStatus.TODO }) status!: TaskStatus;
  @ManyToOne(() => Organization, { eager: true }) org!: Organization;
  @ManyToOne(() => User, { eager: true }) owner!: User;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
