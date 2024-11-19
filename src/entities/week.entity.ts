import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Semester } from './semester.entity';
import { Frequency } from './frequency.entity';

@Entity()
export class Week {
  @PrimaryGeneratedColumn()
  id_week: number;

  @Column()
  number_week: number;

  @Column()
  startDateWeek: Date;

  @Column()
  endDateWeek: Date;

  @ManyToOne(() => Semester, (semester) => semester.weeks)
  semester: Semester;

  @OneToMany(() => Frequency, (frequency) => frequency.week)
  frequencies: Frequency[];
}
