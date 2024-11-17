import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Year } from 'src/entities/year.entity';
import { Repository } from 'typeorm';
import { CreateYearDto, UpdateYearDto } from './dto/dto_year';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class YearService {
  constructor(
    @InjectRepository(Year)
    private readonly yearRepository: Repository<Year>,
    private readonly courseService: CourseService,
  ) {}

  async create(createYearDto: CreateYearDto): Promise<Year> { 
    const course = await this.courseService.findOne(createYearDto.courseId);
    if (!course) {
      throw new BadRequestException(
        `Course with ID ${createYearDto.courseId} does not exist.`,
      );
    }
    const year = new Year();
    year.name_year = createYearDto.name_year;
    year.course = course;

    return this.yearRepository.save(year);
  }

  async findAll(): Promise<Year[]> {
    return this.yearRepository.find({ relations: ['course'] });
  }

  async findOne(id_year: number): Promise<Year> {
    const year = await this.yearRepository.findOne({
      where: { id_year }, 
      relations: ['course'],
    });
    if (!year) {
      throw new NotFoundException(`Year with ID ${id_year} not found`);
    }
    return year;
  }

  async update(id_year: number, updateYearDto: UpdateYearDto): Promise<Year> {
    const year = await this.findOne(id_year);
    Object.assign(year, updateYearDto);
    return this.yearRepository.save(year);
  }

  async remove(id_year: number): Promise<void> {
    const year = await this.findOne(id_year);
    await this.yearRepository.remove(year);
  }
}
