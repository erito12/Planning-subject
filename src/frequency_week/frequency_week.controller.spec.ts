import { Test, TestingModule } from '@nestjs/testing';
import { FrequencyWeekController } from './frequency_week.controller';

describe('FrenquencyWeekController', () => {
  let controller: FrequencyWeekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrequencyWeekController],
    }).compile();

    controller = module.get<FrequencyWeekController>(FrequencyWeekController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
