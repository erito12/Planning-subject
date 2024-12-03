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

import { SubjectService } from './subject.service';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/dto_subject';
import { Subject } from 'entities/subject.entity';


@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva asignatura' })
  @ApiResponse({ status: 201, description: 'La asignatura ha sido creado.' })
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las aignaturas' })
  @ApiResponse({ status: 200, description: 'Lista de asignaturas.' })
  async findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una asignatura por ID' })
  @ApiResponse({ status: 200, description: 'La asignatura ha sido encontrado.' })
  @ApiResponse({ status: 404, description: 'Asignatura no encontrada.' })
  async findOne(@Param('id') id: number): Promise<Subject> {
    return this.subjectService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un asignatura' })
  @ApiResponse({ status: 200, description: 'La asignatura ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Asignatura no encontrada.' })
  async update(
    @Param('id') id: number,
    @Body() updatesubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return this.subjectService.update(id, updatesubjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una asignatura' })
  @ApiResponse({ status: 204, description: 'La asigntura ha sido eliminado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.subjectService.remove(id);
  }
}
