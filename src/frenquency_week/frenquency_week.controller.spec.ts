import { Test, TestingModule } from '@nestjs/testing';
import { FrenquencyWeekController } from './frenquency_week.controller';

describe('FrenquencyWeekController', () => {
  let controller: FrenquencyWeekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrenquencyWeekController],
    }).compile();

    controller = module.get<FrenquencyWeekController>(FrenquencyWeekController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
