import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column({ unique: true }) email: string;
  @Column() passwordHash: string;
  @Column({ default: 'Viewer' }) role: 'Owner' | 'Admin' | 'Viewer';
}
