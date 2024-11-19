import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemesterModule } from './semester/semester.module';
import { CourseModule } from './course/course.module';
import { WeekModule } from './week/week.module';
import { YearModule } from './year/year.module';
import { TeacherModule } from './teacher/teacher.module';
import { SubjectModule } from './subject/subject.module';
import { FrequencyWeekModule } from './frequency_week/frequency_week.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SemesterModule,

    CourseModule,
    WeekModule,
    YearModule,
    TeacherModule,
    SubjectModule,

    FrequencyWeekModule,
  ],
})
export class AppModule {}
