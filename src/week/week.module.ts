import { forwardRef, Module } from '@nestjs/common';
import { WeekController } from './week.controller';
import { WeekService } from './week.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemesterModule } from 'semester/semester.module';
import { Week } from 'entities/week.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Week]), forwardRef(() => SemesterModule)],
  controllers: [WeekController],
  providers: [WeekService],
  exports: [WeekService,TypeOrmModule],
})
export class WeekModule {}
