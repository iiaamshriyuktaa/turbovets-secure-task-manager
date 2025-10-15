import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
export enum Role { OWNER='Owner', ADMIN='Admin', VIEWER='Viewer' }
@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ type: 'text', unique: true }) name!: Role;
}
