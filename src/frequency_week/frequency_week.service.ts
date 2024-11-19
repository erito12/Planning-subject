import { Injectable } from '@nestjs/common';
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
    private readonly frequencyRepository: Repository <Frequency>,
    private readonly weekService: WeekService,
    private readonly subjectService: SubjectService,
  ) {}

  async create(createFrequencyDto: CreateFrequencyDto): Promise<Frequency> {
    const subject = await this.subjectService.findOne(
      createTeacherDto.subjectId,
    );
    if (!subject) {
      throw new BadRequestException(
        `La asignatura con ID ${createTeacherDto.subjectId}  no existe.`,
      );
    }

    const teacher = new Teacher();
    teacher.fullName = createTeacherDto.fullName;
    teacher.academicDegree = createTeacherDto.academicDegree;
    teacher.subject = subject;

    return this.teacherRepository.save(teacher);
  }

  async findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({ relations: ['semester', 'subject'] });
  }

  async findOne(id_teacher: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { id_teacher },
      relations: ['semester', 'subject'],
    });
    if (!teacher) {
      throw new NotFoundException(`Year with ID ${id_teacher} not found`);
    }
    return teacher;
  }

  async update(
    id_teacher: number,
    updateSubjectDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    const teacher = await this.findOne(id_teacher);
    Object.assign(teacher, updateSubjectDto);
    return this.teacherRepository.save(teacher);
  }

  async remove(id_teacher: number): Promise<void> {
    const teacher = await this.findOne(id_teacher);
    await this.teacherRepository.remove(teacher);
  }


}
