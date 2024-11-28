import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from './dto/dto_course';
import { CourseService } from './course.service';
import { Course } from 'src/entities/course.entity';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('courses') // Etiqueta para la documentación Swagger
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Crear un nuevo Course
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @ApiResponse({ status: 201, description: 'El curso ha sido creado.' })
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.create(createCourseDto);
  }

  // Obtener todos los Courses
  @Get()
  @ApiOperation({ summary: 'Obtener todos los cursos' })
  @ApiResponse({ status: 200, description: 'Lista de cursos.' })
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  // Actualizar un Course
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un curso' })
  @ApiResponse({ status: 200, description: 'El curso ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Curso no encontrado.' })
  async update(
    @Param('id') id: number,
    @Query() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.courseService.update(id, updateCourseDto);
  }

  // Eliminar un Course
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un curso' })
  @ApiResponse({ status: 204, description: 'El curso ha sido eliminado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.courseService.remove(id);
  }
}
