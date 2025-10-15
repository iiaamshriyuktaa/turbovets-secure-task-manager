import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) key!: string; // e.g. 'task:create'
}
