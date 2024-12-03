import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'entities/subject.entity';
import { SemesterModule } from 'semester/semester.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), SemesterModule],
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
})
export class SubjectModule {}
