import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Year } from './year.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id_course: number;

  @Column()
  name_course: string;

  @OneToMany(() => Year, (year) => year.course)
  years: Year[];
}
