import { Module } from '@nestjs/common';
import { FrenquencyWeekController } from './frenquency_week.controller';
import { FrenquencyWeekService } from './frenquency_week.service';

@Module({
  controllers: [FrenquencyWeekController],
  providers: [FrenquencyWeekService]
})
export class FrenquencyWeekModule {}
