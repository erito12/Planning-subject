import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Week } from 'entities/week.entity';

import { Repository } from 'typeorm';

@Injectable()
export class WeekService {
  constructor(
    @InjectRepository(Week)
    private readonly weekRepository: Repository<Week>,
  ) {}
  // Método para encontrar una semana por ID
  async findWeekById(weekId: number): Promise<Week> {
    const week = await this.weekRepository.findOne({
      where: { id_week: weekId },
    });
    if (!week) {
      throw new NotFoundException(`Semana con ID ${weekId} no encontrada`);
    }
    return week;
  }

  async findWeeksBySemester(semesterId: number): Promise<Week[]> {
    const response = this.weekRepository.find({
      where: { semester: { id_semester: semesterId } },
    });
    return response;
  }
}
