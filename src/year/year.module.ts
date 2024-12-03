import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from 'course/course.module';

import { Year } from 'entities/year.entity';
import { YearService } from './year.service';
import { YearController } from './year.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Year]), CourseModule],
  providers: [YearService],
  controllers: [YearController],
  exports: [YearService],
})
export class YearModule {}
