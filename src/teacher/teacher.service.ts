import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTeacherDto, UpdateTeacherDto } from './dto/dto_teacher';
import { Teacher } from 'entities/teacher.entity';
import { SubjectService } from 'subject/subject.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,

    private readonly subjectService: SubjectService,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
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
      throw new NotFoundException(`Teacher with ID ${id_teacher} not found`);
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
