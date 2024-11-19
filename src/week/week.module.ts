import { forwardRef, Module } from '@nestjs/common';
import { WeekController } from './week.controller';
import { WeekService } from './week.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Week } from 'src/entities/week.entity';
import { SemesterModule } from 'src/semester/semester.module';

@Module({
  imports: [TypeOrmModule.forFeature([Week]), forwardRef(() => SemesterModule)],
  controllers: [WeekController],
  providers: [WeekService],
  exports: [WeekService,TypeOrmModule],
})
export class WeekModule {}
