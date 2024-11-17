import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Week } from 'src/entities/week.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeekService {
  constructor(
    @InjectRepository(Week)
    private subjectRepository: Repository<Week>,
  ) {}
}
