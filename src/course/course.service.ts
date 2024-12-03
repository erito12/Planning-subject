import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateCourseDto, UpdateCourseDto } from './dto/dto_course';
import { Course } from 'entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  // Crear un nuevo Course
  async create(course: CreateCourseDto): Promise<Course> {
    const newCourse = this.courseRepository.create(course);
    return this.courseRepository.save(newCourse);
  }

  // Obtener todos los Course
  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  // Encontrar por ID
  async findOne(id_course: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id_course: id_course },
    });
    if (!course) {
      throw new Error(`Subject with ID ${id_course} not found`);
    }
    return course;
  }

  // Actualizar un Course
  async update(
    id_course: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const existingCourse = await this.findOne(id_course);
    if (!existingCourse) {
      throw new Error(`Course with ID ${id_course} not found`);
    }

    // Actualiza solo las propiedades que existen en el DTO
    Object.assign(existingCourse, updateCourseDto);
    return this.courseRepository.save(existingCourse);
  }

  // Eliminar un Course
  async remove(id_course: number): Promise<void> {
    await this.courseRepository.delete(id_course);
  }
}
