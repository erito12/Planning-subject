import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeacherService } from './teacher.service';
import { Teacher } from 'entities/teacher.entity';
import { SemesterModule } from 'semester/semester.module';
import { SubjectModule } from 'subject/subject.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), SemesterModule, SubjectModule],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
