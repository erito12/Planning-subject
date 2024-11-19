import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Semester } from 'src/entities/semester.entity';
import { CreateSemesterDto, UpdateSemesterDto } from './dto/dto_semester';
import { YearService } from 'src/year/year.service';
import { Week } from 'src/entities/week.entity';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>,
    @InjectRepository(Week) // Inyectar el repositorio de Week
    private readonly weekRepository: Repository<Week>,
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
    // Convertir las fechas a objetos Date
    const startDate = new Date(createSemesterDto.startDateSemester);
    const endDate = new Date(createSemesterDto.endDateSemester);

    // Verificar que las fechas sean válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException('Invalid start or end date.');
    }

    // Calcular el total de semanas
    const totalWeeks = this.calculateTotalWeeks(startDate, endDate);

    const semester = new Semester();
    semester.name_semester = createSemesterDto.name_semester;
    semester.startDateSemester = startDate;
    semester.endDateSemester = endDate;
    semester.totalWeeks = totalWeeks; // Asignar el total de semanas calculado
    semester.year = year;

    const savedSemester = await this.semesterRepository.save(semester);

    // Crear semanas después de guardar el semestre
    await this.createWeeks(savedSemester, startDate, totalWeeks);

    return savedSemester;
  }
  private async createWeeks(
    semester: Semester,
    startDate: Date,
    totalWeeks: number,
  ): Promise<void> {
    const weeks: Week[] = [];

    for (let i = 0; i < totalWeeks; i++) {
      const weekStartDate = new Date(startDate);
      weekStartDate.setDate(startDate.getDate() + i * 7);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6); // Fin de semana es 6 días después

      const week = new Week();
      week.number_week = i + 1; // Número de semana comienza desde 1
      week.startDateWeek = weekStartDate;
      week.endDateWeek = weekEndDate;
      week.semester = semester; // Asociar la semana con el semestre

      weeks.push(week);
    }
    // Guardar todas las semanas en la base de datos
    await this.weekRepository.save(weeks);
  }

  async findAll(): Promise<Semester[]> {
    return this.semesterRepository.find({ relations: ['year'] });
  }

  async findOne(id_semester: number): Promise<Semester> {
    const semester = await this.semesterRepository.findOne({
      where: { id_semester },
      relations: ['year'],
    });
    if (!semester) {
      throw new NotFoundException(`Year with ID ${id_semester} not found`);
    }
    return semester;
  }

  async update(
    id_semester: number,
    updateYearDto: UpdateSemesterDto,
  ): Promise<Semester> {
    const year = await this.findOne(id_semester);
    Object.assign(year, updateYearDto);
    return this.semesterRepository.save(year);
  }

  async remove(id_semester: number): Promise<void> {
    const year = await this.findOne(id_semester);
    await this.semesterRepository.remove(year);
  }
}
