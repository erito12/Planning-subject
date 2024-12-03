import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';
import { YearModule } from 'year/year.module';
import { WeekModule } from 'week/week.module';
import { Semester } from 'entities/semester.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Semester]),
    YearModule,
    forwardRef(() => WeekModule), // Usa forwardRef aquí
  ],
  providers: [SemesterService],
  controllers: [SemesterController],
  exports: [SemesterService],
})
export class SemesterModule {}
