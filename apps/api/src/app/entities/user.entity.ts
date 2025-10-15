import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Organization } from './organization.entity';
import { RoleEntity } from './role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) email!: string;
  @Column() passwordHash!: string;
  @ManyToOne(() => Organization, (o) => o.users, { eager: true }) org!: Organization;
  @ManyToMany(() => RoleEntity, { eager: true }) @JoinTable() roles!: RoleEntity[];
}
