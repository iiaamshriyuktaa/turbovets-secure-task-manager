import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Task {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @Column({ default: 'todo' }) status: 'todo'|'doing'|'done';
  @Column({ nullable: true }) category?: 'Work'|'Personal';
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) createdAt: string;
}
