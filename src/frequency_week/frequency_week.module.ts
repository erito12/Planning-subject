import { Module } from '@nestjs/common';


import { TypeOrmModule } from '@nestjs/typeorm';

import { FrequencyWeekController } from './frequency_week.controller';
import { FrequencyWeekService } from './frequency_week.service';
import { Frequency } from 'entities/frequency.entity';
import { WeekModule } from 'week/week.module';
import { SubjectModule } from 'subject/subject.module';

@Module({
  imports: [TypeOrmModule.forFeature([Frequency]), WeekModule, SubjectModule],
  controllers: [FrequencyWeekController],
  providers: [FrequencyWeekService],
  exports: [FrequencyWeekService],
})
export class FrequencyWeekModule {}
