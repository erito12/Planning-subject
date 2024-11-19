import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Subject } from './subject.entity';
import { Year } from './year.entity';
import { Semester } from './semester.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id_teacher: number;

  @Column()
  fullName: string;

  @Column()
  academicDegree: string;

  @ManyToOne(() => Semester, (semester) => semester.teacher)
  semester: Semester;

  @ManyToOne(() => Subject, (subject: Subject) => subject.teachers)
  subject: Subject;
}
