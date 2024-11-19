import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/entities/subject.entity';
import { SemesterService } from 'src/semester/semester.service';
import { Repository } from 'typeorm';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/dto_subject';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    private readonly semesterService: SemesterService,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const semester = await this.semesterService.findOne(
      createSubjectDto.semesterId,
    );
    if (!semester) {
      throw new BadRequestException(
        `El curso con ID ${createSubjectDto.semesterId} no existe.`,
      );
    }
    const subject = new Subject();
    subject.name_subject = createSubjectDto.name_subject;
    subject.totalHours_subject = createSubjectDto.totalHours_subject;
    subject.semester = semester;

    return this.subjectRepository.save(subject);
  }

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find({ relations: ['semester'] });
  }

  async findOne(id_subject: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id_subject },
      relations: ['semester'],
    });
    if (!subject) {
      throw new NotFoundException(`Year with ID ${id_subject} not found`);
    }
    return subject;
  }

  async update(
    id_subject: number,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    const subject = await this.findOne(id_subject);
    Object.assign(subject, updateSubjectDto);
    return this.subjectRepository.save(subject);
  }

  async remove(id_subject: number): Promise<void> {
    const subject = await this.findOne(id_subject);
    await this.subjectRepository.remove(subject);
  }
}
