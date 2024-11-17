import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';
import { Semester } from 'src/entities/semester.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { YearModule } from 'src/year/year.module';

@Module({
  imports: [TypeOrmModule.forFeature([Semester]),  YearModule,],
  providers: [SemesterService],
  controllers: [SemesterController],
  exports: [SemesterService],
})
export class SemesterModule {}
