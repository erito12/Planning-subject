import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Frequency } from 'src/entities/frequency.entity';
import { SubjectService } from 'src/subject/subject.service';
import { WeekService } from 'src/week/week.service';
import { CreateFrequencyDto } from './dto/dto_frquency';

@Injectable()
export class FrequencyWeekService {
  constructor(
    @InjectRepository(Frequency)
    private readonly frequencyRepository: Repository<Frequency>,
    private readonly weekService: WeekService,
    private readonly subjectService: SubjectService,
  ) {}

  async create(createFrequencyDto: CreateFrequencyDto): Promise<Frequency> {
    // const week = await this.weekService.findWeekById(createFrequencyDto.weekId);
    const subject = await this.subjectService.findOne(
      createFrequencyDto.subjectId,
    );
    if (!subject) {
      throw new BadRequestException(
        `La asignatura con ID ${createFrequencyDto.subjectId}  no existe.`,
      );
    }

    const frequency = new Frequency();
    frequency.frequencyType = createFrequencyDto.frequencyType;
    frequency.numberFrequency = Number(createFrequencyDto.numberFrequency);
    frequency.subject = subject;
    // frequency.week = week;

    return this.frequencyRepository.save(frequency);
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
