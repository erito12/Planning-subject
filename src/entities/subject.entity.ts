import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SubjectType } from '../common/enums/subject-type.enum';
import { Teacher } from './teacher.entity';

import { Semester } from './semester.entity';
import { Frequency } from './frecuency.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id_subject: number;

  @Column()
  name_subject: string;

  @Column()
  totalHours_subject: number;

  type: SubjectType;

  @OneToMany(() => Teacher, (teacher) => teacher.subjects)
  teachers: Teacher[];

  @OneToMany(() => Frequency, (frequency) => frequency.subject)
  frequencies: Frequency[];

  @ManyToOne(() => Semester, (semester) => semester.subjects)
  semester: Semester;
}
