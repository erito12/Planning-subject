import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Course } from './course.entity';
import { Semester } from './semester.entity';


@Entity()
export class Year {
  @PrimaryGeneratedColumn()
  id_year: number;

  @Column()
  name_year: string;

  @ManyToOne(() => Course, (course) => course.years)
  course: Course;

  @OneToMany(() => Semester, (semester) => semester.year)
  semesters: Semester[];
}
