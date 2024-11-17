import { Module } from '@nestjs/common';
import { WeekController } from './week.controller';
import { WeekService } from './week.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Week } from 'src/entities/week.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Week])],
  controllers: [WeekController],
  providers: [WeekService],
  exports: [WeekService],
})
export class WeekModule {}
