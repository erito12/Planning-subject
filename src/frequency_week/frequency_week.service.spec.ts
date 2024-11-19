import { Test, TestingModule } from '@nestjs/testing';
import { FrequencyWeekService } from './frequency_week.service';

describe('FrenquencyWeekService', () => {
  let service: FrequencyWeekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrequencyWeekService],
    }).compile();

    service = module.get<FrequencyWeekService>(FrequencyWeekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
