import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Year } from './year.entity';
import { Subject } from './subject.entity';
import { Week } from './week.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class Semester {
  @PrimaryGeneratedColumn()
  id_semester: number;

  @Column()
  name_semester: string;

  @Column()
  startDateSemester: Date;

  @Column()
  endDateSemester: Date;

  @Column()
  totalWeeks: number;

  @ManyToOne(() => Year, (year) => year.semesters)
  year: Year;

  @OneToMany(() => Subject, (subject) => subject.semester)
  subjects: Subject[];
  
  @OneToMany(() => Teacher, (teacher) => teacher.semester)
  teacher: Teacher[];

  @OneToMany(() => Week, (week) => week.semester)
  weeks: Week[];
}
