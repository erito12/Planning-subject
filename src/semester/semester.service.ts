import { BadRequestException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Semester } from 'src/entities/semester.entity';
import { CreateSemesterDto } from './dto/dto_semester';
import { YearService } from 'src/year/year.service';
import { SemesterController } from './semester.controller';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>,
    private readonly yearService: YearService,
  ) {}

  private calculateTotalWeeks(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const weekDiff = timeDiff / (1000 * 3600 * 24 * 7); // Convertir milisegundos a semanas
    return Math.ceil(weekDiff); // Redondear hacia arriba
  }

  async create(createSemesterDto: CreateSemesterDto): Promise<Semester> {
    const year = await this.yearService.findOne(createSemesterDto.yearId);
    if (!year) {
      throw new BadRequestException(
        `Course with ID ${createSemesterDto.yearId} does not exist.`,
      );
    }

    // Calcular el total de semanas
    const totalWeeks = this.calculateTotalWeeks(
      createSemesterDto.endDateSemester,
      createSemesterDto.startDateSemester,
    );

    const semester = new Semester();
    semester.name_semester = createSemesterDto.name_semester;
    semester.startDateSemester = createSemesterDto.startDateSemester;
    semester.endDateSemester = createSemesterDto.endDateSemester;
    semester.totalWeeks = totalWeeks; // Asignar el total de semanas calculado

    return this.semesterRepository.save(semester);
  }

  
  async findAll(): Promise<Semester[]> {
    return this.semesterRepository.find({ relations: ['year'] });
    
  }
}
