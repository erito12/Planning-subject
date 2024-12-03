import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TeacherService } from './teacher.service';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/dto_teacher';
import { Teacher } from 'entities/teacher.entity';


@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un profesor' })
  @ApiResponse({ status: 201, description: 'La asignatura ha sido creado.' })
  async create(@Body() createTeachertDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(createTeachertDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los profesores' })
  @ApiResponse({ status: 200, description: 'Lista de profesores.' })
  async findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un año por ID' })
  @ApiResponse({ status: 200, description: 'El año encontrado.' })
  @ApiResponse({ status: 404, description: 'Año no encontrado.' })
  async findOne(@Param('id') id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un año' })
  @ApiResponse({ status: 200, description: 'El año ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Año no encontrado.' })
  async update(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un año' })
  @ApiResponse({ status: 204, description: 'El año ha sido eliminado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.teacherService.remove(id);
  }
}
