import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Year } from './year.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id_teacher: number;

  @Column()
  fullName: string;

  @Column()
  academicDegree: string;

  @ManyToOne(() => Year, (year) => year.teacher)
  year: Year;

  @ManyToOne(() => Subject, (subject: Subject) => subject.teachers)
  subjects: Subject;
}
