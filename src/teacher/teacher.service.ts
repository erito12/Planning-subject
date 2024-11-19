import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teacher.entity';
import { SemesterService } from 'src/semester/semester.service';
import { SubjectService } from 'src/subject/subject.service';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/dto_teacher';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly semesterService: SemesterService,
    private readonly subjectService: SubjectService,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const semester = await this.semesterService.findOne(
      createTeacherDto.semesterId,
    );
    const subject = await this.subjectService.findOne(
      createTeacherDto.subjectId,
    );
    if (!semester) {
      throw new BadRequestException(
        `El curso con ID ${createTeacherDto.semesterId}  no existe.`,
      );
    } else if (!subject) {
      throw new BadRequestException(
        `La asignatura con ID ${createTeacherDto.subjectId}  no existe.`,
      );
    }
    // Verificar si la asignatura está asociada al semestre
    if (subject.semester.id_semester !== semester.id_semester) {
      throw new BadRequestException(
        `La asignatura con ID ${createTeacherDto.subjectId} no está asociada al semestre con ID ${createTeacherDto.semesterId}.`,
      );
    }
    const teacher = new Teacher();
    teacher.fullName = createTeacherDto.fullName;
    teacher.academicDegree = createTeacherDto.academicDegree;
    teacher.semester = semester;
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
