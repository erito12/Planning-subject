import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Week } from './week.entity';
import { Subject } from './subject.entity';
import { SubjectType } from 'src/common/enums/subject-type.enum';

@Entity()
export class Frequency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  frequencyType: SubjectType;

  @Column()
  frecuencyDay: string;

  @ManyToOne(() => Week, (week) => week.frequencies)
  week: Week;

  @ManyToOne(() => Subject, (subject) => subject.frequencies)
  subject: Subject; // Relación con la asignatura
}
