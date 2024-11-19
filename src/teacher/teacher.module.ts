import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teacher.entity';
import { SemesterModule } from 'src/semester/semester.module';
import { SubjectModule } from 'src/subject/subject.module';
// import { TeacherService } from './teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), SemesterModule, SubjectModule],
  controllers: [TeacherController],
  // providers: [TeacherService]
})
export class TeacherModule {}
