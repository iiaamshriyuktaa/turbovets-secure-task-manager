import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ unique: true }) name!: string;
  @ManyToOne(() => Organization, (o) => o.children, { nullable: true }) parent?: Organization;
  @OneToMany(() => Organization, (o) => o.parent) children!: Organization[];
  @OneToMany(() => (require('./user.entity').User), (u: any) => u.org) users!: any[];
}
