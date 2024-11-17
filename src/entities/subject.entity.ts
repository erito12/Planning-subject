import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SubjectType } from '../common/enums/subject-type.enum';
import { Teacher } from './teacher.entity';
import { Frequency } from './frecuency.entity';

import { Semester } from './semester.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id_subject: number;

  @Column()
  name_subject: string;

  @Column()
  totalHours_subject: number;

  @Column({
    type: 'simple-enum',
    enum: SubjectType,
  })
  type: SubjectType;

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  @JoinTable()
  teachers: Teacher[];

  @OneToMany(() => Frequency, (frequency) => frequency.subject)
  frequencies: Frequency[];

  @ManyToOne(() => Semester, (semester) => semester.subjects)
  semester: Semester;
}
