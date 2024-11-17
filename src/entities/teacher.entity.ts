import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Year } from './year.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  academicDegree: string;

  @ManyToOne(() => Year, (year) => year.teacher)
  year: Year;

  @ManyToMany(() => Subject, (subject: Subject) => subject.teachers)
  subjects: Subject[];
}
