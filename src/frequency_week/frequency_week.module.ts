import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';
import { Frequency } from 'src/entities/frequency.entity';
import { WeekModule } from 'src/week/week.module';
import { SubjectModule } from 'src/subject/subject.module';
import { FrequencyWeekController } from './frequency_week.controller';
import { FrequencyWeekService } from './frequency_week.service';

@Module({
  imports: [TypeOrmModule.forFeature([Frequency]), WeekModule, SubjectModule],
  controllers: [FrequencyWeekController],
  providers: [FrequencyWeekService],
  exports: [FrequencyWeekService],
})
export class FrequencyWeekModule {}
