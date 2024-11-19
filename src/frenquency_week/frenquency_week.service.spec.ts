import { Test, TestingModule } from '@nestjs/testing';
import { FrenquencyWeekService } from './frenquency_week.service';

describe('FrenquencyWeekService', () => {
  let service: FrenquencyWeekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrenquencyWeekService],
    }).compile();

    service = module.get<FrenquencyWeekService>(FrenquencyWeekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
