import { Module } from '@nestjs/common';
import { YearService } from './year.service';
import { YearController } from './year.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Year } from 'src/entities/year.entity';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([Year]), CourseModule],
  providers: [YearService],
  controllers: [YearController],
  exports: [YearService],
})
export class YearModule {}
