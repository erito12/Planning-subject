import { forwardRef, Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';
import { Semester } from 'src/entities/semester.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { YearModule } from 'src/year/year.module';
import { WeekModule } from 'src/week/week.module';

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
