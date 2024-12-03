import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Not, Repository } from 'typeorm';

import { CreateFrequencyDto } from './dto/dto_frquency';
import { Frequency } from 'entities/frequency.entity';
import { WeekService } from 'week/week.service';
import { SubjectService } from 'subject/subject.service';

@Injectable()
export class FrequencyWeekService {
  constructor(
    @InjectRepository(Frequency)
    private readonly frequencyRepository: Repository<Frequency>,
    private readonly weekService: WeekService,
    private readonly subjectService: SubjectService,
  ) {}

  private async checkOverlappingEvaluations(
    weekId: number,
    subjectId: number,
  ): Promise<boolean> {
    const overlappingFrequencies = await this.frequencyRepository.find({
      where: {
        week: { id_week: weekId },
        frequencyType: In(['seminario', 'prueba parcial', 'prueba final']), // Usa In para múltiples valores
        subject: { id_subject: Not(subjectId) }, // Excluye la asignatura actual
      } as FindOptionsWhere<Frequency>, 
      relations: ['subject'],
    });
    console.log(
      'Frecuencias superpuestas encontradas:',
      overlappingFrequencies,
    ); // Agrega este log

    return overlappingFrequencies.length > 0; // Retorna true si hay superposiciones
  }

  private generateReport(overlappingFrequencies: Frequency[]) {
    console.log('Reporte de superposición de evaluaciones:');
    overlappingFrequencies.forEach((freq) => {
      console.log(
        `Evaluación: ${freq.frequencyType}, Asignatura: ${freq.subject.name_subject}, Semana: ${freq.week.id_week}`,
      );
    });
  }

  // Método para verificar el porcentaje de conferencias
  private async checkConferencePercentage(subjectId: number): Promise<boolean> {
    const conferenceCount = await this.frequencyRepository.count({
      where: {
        subject: { id_subject: subjectId }, 
        frequencyType: 'conferencia',
      },
    });

    const totalHours = (await this.subjectService.findOne(subjectId))
      .totalHours_subject; // Obtén el total de horas de la asignatura

    if (!totalHours) {
      throw new BadRequestException(
        `El total de horas para la asignatura con ID ${subjectId} no está definido.`,
      );
    }

    const hoursConferences = conferenceCount * 1.2; // Cada conferencia dura 1.2 horas
    const percentage = (hoursConferences * 100) / totalHours; // Calcula el porcentaje

    return percentage > 20;
  }

  async create(createFrequencyDto: CreateFrequencyDto): Promise<Frequency> {
    const subject = await this.subjectService.findOne(
      createFrequencyDto.subjectId,
    );
    const week = await this.weekService.findWeekById(createFrequencyDto.weekId);

    if (!week) {
      throw new BadRequestException(
        `La semana con ID ${createFrequencyDto.weekId} no existe.`,
      );
    }

    if (!subject) {
      throw new BadRequestException(
        `La asignatura con ID ${createFrequencyDto.subjectId} no existe.`,
      );
    }

    const frequency = new Frequency();
    frequency.frequencyType = createFrequencyDto.frequencyType;
    frequency.numberFrequency = Number(createFrequencyDto.numberFrequency);
    frequency.subject = subject;
    frequency.week = week;

    // Guardamos la nueva frecuencia
    const savedFrequency = await this.frequencyRepository.save(frequency);

    // Verificamos si la frecuencia es de tipo "conferencia"
    if (frequency.frequencyType === 'conferencia') {
      const isOver20Percent = await this.checkConferencePercentage(
        subject.id_subject,
      );
      if (isOver20Percent) {
        console.log('El porcentaje de horas de conferencias supera el 20%');
      }
    }

    // Verificación de superposición de evaluaciones
    if (
      ['seminario', 'prueba parcial', 'final'].includes(frequency.frequencyType)
    ) {
      const hasOverlaps = await this.checkOverlappingEvaluations(
        week.id_week,
        subject.id_subject,
      );

      if (hasOverlaps) {
        const overlappingFrequencies = await this.frequencyRepository.find({
          where: {
            week: { id_week: week.id_week },
            frequencyType: In(['seminario', 'prueba parcial', 'final']), // Usa In aquí
            subject: { id_subject: Not(subject.id_subject) },
          },
          relations: ['subject'],
        });
        this.generateReport(overlappingFrequencies);
      }
    }

    return savedFrequency;
  }
  async findAll(): Promise<Frequency[]> {
    return this.frequencyRepository.find({
      relations: ['week', 'subject'],
    });
  }

  async findOne(id_frequency: number): Promise<Frequency> {
    const frequency = await this.frequencyRepository.findOne({
      where: { id_frequency },
      relations: ['week', 'subject'],
    });
    if (!frequency) {
      throw new NotFoundException(`Year with ID ${id_frequency} not found`);
    }
    return frequency;
  }

  // async update(
  //   id_frequency: number,
  //   updateSubjectDto: UpdateFrequencyDto,
  // ): Promise<Teacher> {
  //   const teacher = await this.findOne(id_teacher);
  //   Object.assign(teacher, updateSubjectDto);
  //   return this.teacherRepository.save(teacher);
  // }

  async remove(id_frequency: number): Promise<void> {
    const frequency = await this.findOne(id_frequency);
    await this.frequencyRepository.remove(frequency);
  }
}
