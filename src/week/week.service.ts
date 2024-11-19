import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Week } from 'src/entities/week.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeekService {
  constructor(
    @InjectRepository(Week)
    private readonly weekRepository: Repository<Week>,
  ) {}
  // Método para encontrar una semana por ID

  async findWeeksBySemester(semesterId: number): Promise<Week[]> {
    return this.weekRepository.find({
      where: { semester: { id_semester: semesterId } },
    });
  }

  // // Método para listar todas las semanas
  // async findAll(): Promise<Week[]> {
  //   return this.weekRepository.find({ relations: ['semester'] });
  // }
}
